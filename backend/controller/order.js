const asyncHandler = require("express-async-handler");
const Order = require("../models/inventory/order");
const Coupon = require("../models/inventory/coupon");
const User = require("../models/User");

function generateUniqueNumber() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const firstTwoChars = "ORD";
  let uniqueNumber = firstTwoChars;

  // Generate random characters for the remaining length
  const remainingLength = Math.floor(Math.random() * 3) + 6; // Generate random length between 8 and 10
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueNumber += characters.charAt(randomIndex);
  }

  return uniqueNumber;
}

const createOrderWithCoupon = asyncHandler(async (req, res) => {
  const { orderItems, address, couponCode, shippingPrice, taxPrice } = req.body;

  try {
    // Calculate the initial total price based on order items.
    const initialTotalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (shippingPrice !== undefined && isNaN(shippingPrice)) {
      return res.status(400).json({ msg: "Invalid Shipping Price number" });
    }

    if (taxPrice !== undefined && isNaN(taxPrice)) {
      return res.status(400).json({ msg: "Invalid Tax price number" });
    }

    let discount = 0;

    if (couponCode) {
      // If a coupon code is provided, look up the coupon based on the code.
      const coupon = await Coupon.findOne({ code: couponCode });
      const userCoupn = await Order.find({ couponCode: couponCode });

      if (coupon) {
        // Check if the coupon is still valid
        if (!coupon.expire) {
          if (userCoupn.length < coupon.maximumClient) {
            // Calculate the discount based on the coupon type (percentage or fixed amount).
            if (coupon.type === "Percentage") {
              discount = (coupon.value / 100) * initialTotalPrice;
            } else if (coupon.type === "Fixed") {
              discount = coupon.value;
            }

            // Update the coupon usage count.
            coupon.usedCount++;

            // Save the updated coupon.
            await coupon.save();
          } else {
            return res
              .status(400)
              .json({ msg: "Coupon has reached maximum clients" });
          }
        } else {
          return res.status(400).json({ msg: "Coupon has expired" });
        }
      } else {
        return res.status(400).json({ msg: "Invalid coupon code" });
      }
    }

    // Calculate the final total price after applying the discount.
    const totalPrice = initialTotalPrice - discount;

    const orderId = generateUniqueNumber();
    // Create the order with the calculated total price.
    const order = new Order({
      OrdId: orderId,
      orderItems,
      address,
      totalPrice: totalPrice + shippingPrice,
      shippingPrice,
      customerId: req.user._id,
      taxPrice,
      couponCode: couponCode,
      client: req.user.client,
    });

    // Save the order to the database.
    await order.save();
    res.status(201).json({ msg: "Order created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

const UpdateOrderByStatus = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "Order updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

const UpdateOrder = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Update with all fields from req.body
    const updated = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: "Order updated successfully", order: updated });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getOrderByUser = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Client not found" });
    }
    const clientId = req.params.id;
    const client = await Order.find({ client: clientId });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getOrderWithId = asyncHandler(async (req, res) => {
  try {
    const orderId = req.user._id;

    if (!orderId) {
      return res.status(404).json({ msg: "Order ID is required" });
    }

    const order = await Order.find({ customerId: orderId })
      .populate("orderItems.item", "name")
      .populate("customerId")
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const orders = await Order.findById(req.params.id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderItems.item", "name")
      .populate("customerId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getCustomerWithOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name email phone")
      .populate("orderItems.item", "name")
      .exec();

    const customersWithOrders = orders.reduce((acc, order) => {
      const customer = order.customerId;

      if (!acc.some((c) => c._id.toString() === customer._id.toString())) {
        acc.push({
          _id: customer._id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          totalSpent: 0,
          orders: [],
        });
      }

      const cIndex = acc.findIndex(
        (c) => c._id.toString() === customer._id.toString()
      );
      acc[cIndex].orders.push(order);
      acc[cIndex].totalSpent += order.totalPrice;

      return acc;
    }, []);

    // ✅ Send response
    res.status(200).json(customersWithOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getCustomerOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const users = await User.findOne({ email });

    if (!users) return res.status(404).json({ message: "Customer not found" });

    const orders = await Order.find({ customerId: users._id }).populate(
      "orderItems.item"
    );

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
};

module.exports = {
  createOrderWithCoupon,
  UpdateOrder,
  getOrderByUser,
  getOrders,
  getOrderById,
  getCustomerOrdersByEmail,
  getCustomerWithOrder,
  UpdateOrderByStatus,
  getOrderWithId,
};
