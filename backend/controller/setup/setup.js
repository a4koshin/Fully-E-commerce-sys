const asyncHandler = require("express-async-handler");
const Provider = require("../../models/provider");
const District = require("../../models/inventory/district");
const Coupon = require("../../models/inventory/coupon");
const mongoose = require("mongoose");
const location = require("../../models/inventory/location");

// CREATE
const createFunction = asyncHandler(async (req, res) => {
  const { modelName } = req.params;
  const { name } = req.body;

  try {
    if (!mongoose.models[modelName]) {
      return res.status(400).json({ msg: "Invalid model name" });
    }

    const Model = mongoose.model(modelName);

    const user = await Provider.findById(req.body.user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const data = {
      name,
      user: req.body.user,
    };
    //   const newDocument = await DocClientType.create(data);
    const newDocument = await Model.create(data);

    res.status(201).json({ msg: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

// READ
const readFunction = asyncHandler(async (req, res) => {
  const { modelName } = req.params;

  try {
    if (!mongoose.models[modelName]) {
      return res.status(400).json({ msg: "Invalid model name" });
    }

    const user = await Provider.findById(req.body.user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const Model = mongoose.model(modelName);
    const documents = await Model.find({
      status: { $in: [0, 1] },
    })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

const readPublicFunction = asyncHandler(async (req, res) => {
  const { modelName } = req.params;

  try {
    if (!mongoose.models[modelName]) {
      return res.status(400).json({ msg: "Invalid model name" });
    }

    const Model = mongoose.model(modelName);
    const documents = await Model.find({
      status: 0,
    }).sort({ createdAt: -1 });

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

// UPDATE
const updateFunction = asyncHandler(async (req, res) => {
  const { modelName, id } = req.params;
  const { name } = req.body;

  try {
    if (!mongoose.models[modelName]) {
      return res.status(400).json({ msg: "Invalid model name" });
    }

    const data = {
      name,
    };

    const Model = mongoose.model(modelName);
    const updatedDocument = await Model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ msg: "Document not found" });
    }

    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

const DynamicupdateFunction = asyncHandler(async (req, res) => {
  const { modelName, id } = req.params;
  const { type, status } = req.body;

  try {
    if (!mongoose.models[modelName]) {
      return res.status(400).json({ msg: "Invalid model name" });
    }

    if (type === "delete") {
      const data = {
        status: status,
      };
      const Model = mongoose.model(modelName);
      const updatedDocument = await Model.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatedDocument) {
        return res.status(404).json({ msg: "Document not found" });
      }

      res.status(200).json({ msg: "Deleted successfully" });
    } else if (type === "status") {
      const Model = mongoose.model(modelName);
      const item = await Model.findById(id);

      if (!item) {
        return res.status(404).json({ msg: "Document not found" });
      }

      if (item.status === 0) {
        const updatedDocument = await Model.findByIdAndUpdate(
          id,
          {
            status: 1,
            updatedAt: Date.now(),
          },
          {
            new: true,
          }
        );

        if (!updatedDocument) {
          return res.status(404).json({ msg: "Document not found" });
        }

        res.status(200).json({ msg: "Updated successfully" });
      } else if (item.status === 1) {
        const updatedDocument = await Model.findByIdAndUpdate(
          id,
          {
            status: 0,
            updatedAt: Date.now(),
          },
          {
            new: true,
          }
        );

        if (!updatedDocument) {
          return res.status(404).json({ msg: "Document not found" });
        }

        res.status(200).json({ msg: "Updated successfully" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

const createDistrict = asyncHandler(async (req, res) => {
  try {
    const { name, location } = req.body;
    const user = await Provider.findById(req.body.user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const newCategory = new District({ name, location, user: req.body.user });
    await newCategory.save();
    res.status(201).json({ msg: "created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: " creation failed" });
  }
});

const updateDistrict = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, location } = req.body;
    const updatedCategory = await District.findByIdAndUpdate(
      categoryId,
      { name, location },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: " update failed" });
  }
});

const getAllDistcrits = asyncHandler(async (req, res) => {
  try {
    const categories = await District.find({ status: { $in: [0, 1] } })
      .populate("location")
      .populate("user");
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching categories" });
  }
});

const createLocation= asyncHandler(async (req, res) => {
  try {
    const { name, status } = req.body;
    const user = await Provider.findById(req.body.user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const newLocation = new location({ name, status, user: req.body.user });
    await newLocation.save();
    res.status(201).json({ msg: "created  Location successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: " creation failed" });
  }
});
const getAllLocation = asyncHandler(async (req, res) => {
  try {
    const locations = await location.find({ status: { $in: [0, 1] } })
      .populate("user");
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching categories" });
  }
});
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const { code, expire, type, value } = req.body;

    if (value !== undefined && isNaN(value)) {
      return res.status(400).json({ msg: "Invalid value" });
    }

    const user = await Provider.findById(req.provider._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ msg: "Coupon code already exists" });
    }
    const cleanedCode = code.replace(/\s+/g, "");
    const newCoupon = new Coupon({
      code: cleanedCode,
      expire,
      type,
      value,
      user: user._id,
    });
    const coupon = await newCoupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(201).json(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { code, expire, type, value } = req.body;
    const cleanedCode = code.replace(/\s+/g, "");
    const updatedCategory = await Coupon.findByIdAndUpdate(
      id,
      { code: cleanedCode, expire, type, value },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: " update failed" });
  }
});
const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({ status: { $in: [0, 1] } })
    .populate("user")
    .sort("-createdAt");
  res.status(200).json(coupons);
});

module.exports = {
  createFunction,
  readFunction,
  readPublicFunction,
  updateFunction,
  DynamicupdateFunction,

  createDistrict,
  updateDistrict,
  getAllDistcrits,

  createCoupon,
  getAllCoupons,
  updateCoupon,


  createLocation,
  getAllLocation
};
