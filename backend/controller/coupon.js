const asyncHandler = require("express-async-handler");
const Coupon = require("../models/inventory/coupon");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const { code, desc, expire,expireDate, maximumClient, type, value ,status} = req.body;

    console.log(req.body )

    if (value !== undefined && isNaN(value)) {
      return res.status(400).json({ msg: "Invalid value" });
    }

    // Check if a coupon with the same code already exists.
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ msg: "Coupon code already exists" });
    }

    const newCoupon = new Coupon({
      code,
      desc,
      expire,
      maximumClient,
      type,
      value,
      expireDate,
      status,
      client: req.body.id,
    });
    const coupon = await newCoupon.save();
    res.status(201).json({ msg: "created coupon code successfully" });
  } catch (error) { 
    console.log(error);
    res.status(201).json(error);
  }
});

const getCouponById = asyncHandler(async (req, res) => {
  const couponId = req.params.id;
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    return res.status(404).json({ msg: "Coupon not found" });
  }
  res.status(200).json(coupon);
});
const updateCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { code, desc, expire, maximumClient, type, value, expireDate,status} = req.body;

    // Validate value if it's included
    if (value !== undefined && isNaN(value)) {
      return res.status(400).json({ msg: "Invalid value" });
    }

    // Find the existing coupon by ID
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }

    // Check if the code is being changed and already exists
    if (code && code !== coupon.code) {
      const codeExists = await Coupon.findOne({ code });
      if (codeExists) {
        return res.status(400).json({ msg: "Coupon code already exists" });
      }
    }

    // Update the fields
    coupon.code = code || coupon.code;
    coupon.desc = desc || coupon.desc;
    coupon.expire = expire || coupon.expire;
    coupon.maximumClient = maximumClient ?? coupon.maximumClient;
    coupon.type = type || coupon.type;
    coupon.expireDate = expireDate || coupon.expireDate;
    coupon.value = value ?? coupon.value;
    coupon.status = status ?? coupon.status;

    const updatedCoupon = await coupon.save();
    res.status(200).json({ msg: "updated coupon code successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error });
  }
});


// Function to get all coupons
const getAllCoupons = asyncHandler(async (req, res) => {
  let coupons = await Coupon.find({ status: { $in: [0, 1] } }).sort("-createdAt");

  const now = Date.now();

  // Loop through each coupon and update expire flag if needed
  for (const coupon of coupons) {
    if (coupon.expireDate && coupon.expireDate < now && !coupon.expire) {
      coupon.expire = true;
      await coupon.save();
    }
  }
  for (const coupon of coupons) {
  if (coupon.expireDate && coupon.expireDate < now && !coupon.expire) {
    coupon.expire = true;
    coupon.status = 1; 
    await coupon.save();
  }
}

  res.status(200).json(coupons);
});


const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const couponCode = req.params.id;
    const newStatus = req.body.status;

    const coupon = await Coupon.findById(couponCode);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      couponCode,
      { status: newStatus },
      { new: true, runValidators: true }
    );

    res.status(200).json({ msg: "Coupon updated" });
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = {
  createCoupon,
  getCouponById,
  getAllCoupons,
  deleteCoupon,
  updateCoupon
};
