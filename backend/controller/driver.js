const asyncHandler = require("express-async-handler");
const driver = require("../models/inventory/driver");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

const createDriver = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, status, vehicle, image } = req.body;

    const newUser = new User({
      name,
      email,
      phone,
      image,
      roles: "driver",
    });
    await newUser.save();

    const newDriver = new driver({
      name,
      userId: newUser._id,
      email,
      phone,
      vehicle, // use directly
      image,
      status,
    });

    await newDriver.save();

    res.status(201).json({ msg: "Driver created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

const updateDriver = asyncHandler(async (req, res) => {
  try {
    const driverId = req.params.id;
    const updateData = req.body;

    // Find driver by ID and update
    const updatedDriver = await driver.findByIdAndUpdate(driverId, updateData, {
      new: true,
    });

    if (!updatedDriver) {
      return res.status(404).json({ msg: "Driver not found" });
    }

    res.status(200).json({ msg: "Driver updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

const getAllDrivers = asyncHandler(async (req, res) => {
  try {
    const drivers = await driver
      .find()
      .sort({ createdAt: -1 })
      .populate("userId");
    res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.msg });
  }
});

module.exports = {
  createDriver,
  updateDriver,
  getAllDrivers,
};
