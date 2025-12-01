const asyncHandler = require("express-async-handler");
const delivery = require("../models/inventory/delivery");
const driver = require("../models/inventory/driver");

function generateUniqueId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "DEL";

  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return id;
}

const createDelivery = asyncHandler(async (req, res) => {
  try {
    const {
      ordId,
      customerId,
      address,
      driverId,
      priority,
      distance,
      value,
      status,
      estimatedTime,
    } = req.body;
    const deliveryId = generateUniqueId();
    const newDelivery = new delivery({
      delId: deliveryId,
      ordId,
      customerId,
      address,
      driverId,
      priority,
      distance,
      value,
      status,
      estimatedTime,
    });
    await newDelivery.save();
    res.status(201).json({ msg: "Delivery created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error.msg" });
  }
});

const updateDelivery = asyncHandler(async (req, res) => {
  try {
    const updatedDelivery = await delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ msg: "Delivery not found" });
    }

    res.status(200).json({ msg: "Delivery updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error.msg" });
  }
});

const getMyDeliveries = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized: No user ID" });
    }

    // Step 1: Get driver document by userId
    const driverDoc = await driver.findOne({ userId });

    if (!driverDoc) {
      return res
        .status(404)
        .json({ msg: "Driver profile not found for this user" });
    }

    const deliveries = await delivery
      .find({ driverId: driverDoc._id })
      .populate({
        path: "ordId",
        populate: {
          path: "orderItems.item",
          model: "Item",
        },
      })
      .populate({ path: "customerId", select: "name" })
      .populate({ path: "driverId", select: "name" })
      .sort({ createdAt: -1 });

    res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

const getAllDeliveries = asyncHandler(async (req, res) => {
  try {
    const delivers = await delivery
      .find()
      .populate({
        path: "ordId",
        populate: {
          path: "orderItems.item",
          model: "Item",
        },
      })
      .populate({ path: "customerId", select: "name" })
      .populate({ path: "driverId", select: "name" })
      .sort({ createdAt: -1 });
    res.status(200).json(delivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "error.msg" });
  }
});

module.exports = {
  createDelivery,
  getAllDeliveries,
  updateDelivery,
  getMyDeliveries,
};
