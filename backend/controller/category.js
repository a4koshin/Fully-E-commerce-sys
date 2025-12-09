const Category = require("../models/inventory/category");
const SubCategory = require("../models/inventory/subCategory");
const Unit = require("../models/inventory/unit");
const Color = require("../models/inventory/color");
const Brand = require("../models/inventory/brand");
const Size = require("../models/inventory/size");
const Provider = require("../models/provider");
const asyncHandler = require("express-async-handler");

// ===================== CATEGORY =====================
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name?.trim() || !status?.trim()) {
      return res.status(400).json({ msg: "All fields must be non-empty" });
    }

    const newCategory = new Category({ name, status, user: req.body.user });
    await newCategory.save();
    res.status(201).json({ msg: "Category created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Category creation failed" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, status } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, status },
      { new: true, runValidators: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ msg: "Category not found" });
    res.status(200).json({ msg: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Category update failed" });
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching category" });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({ status: { $in: [0, 1] } }).sort({
      createdAt: -1,
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching categories" });
  }
});

// ===================== SUBCATEGORY =====================
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category, status } = req.body;

  // console.log("REQ.BODY:", req.body);
  // console.log("REQ.USER:", req.user);

  if (!name || !category) {
    return res.status(400).json({ msg: "Name and category are required" });
  }

  if (!req.user) {
    return res.status(401).json({ msg: "User not authorized" });
  }
  const isCategory = await Category.findById(category);
  if (!isCategory) {
    res.status(404).json({ msg: "Category does not exist" });
  }

  const newSubCategory = await SubCategory.create({
    name,
    category,
    status,
    user: req.user._id,
  });

  res
    .status(201)
    .json({ msg: "Sub-category created successfully", newSubCategory });
});

const updateSubCategory = asyncHandler(async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const { name, category } = req.body;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { name, category },
      { new: true, runValidators: true }
    );
    if (!updatedSubCategory)
      return res.status(404).json({ msg: "Sub-category not found" });
    res.status(200).json({ msg: "Sub-category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Sub-category update failed" });
  }
});

const getAllSubCategories = asyncHandler(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ status: { $in: [0, 1] } })
      .populate("category")
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching sub-categories" });
  }
});

// ===================== UNIT =====================
const createUnit = asyncHandler(async (req, res) => {
  try {
    const { name, abbreviation, status } = req.body;
    const newUnit = new Unit({
      name,
      abbreviation,
      status,
      user: req.body._id,
    });
    await newUnit.save();
    res.status(201).json({ msg: "Unit created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unit creation failed" });
  }
});

const updateUnit = asyncHandler(async (req, res) => {
  try {
    const unitId = req.params.id;
    const { name, abbreviation, status } = req.body;
    const updatedUnit = await Unit.findByIdAndUpdate(
      unitId,
      { name, abbreviation, status },
      { new: true, runValidators: true }
    );
    if (!updatedUnit) return res.status(404).json({ msg: "Unit not found" });
    res.status(200).json({ msg: "Unit updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Unit update failed" });
  }
});

const getAllUnits = asyncHandler(async (req, res) => {
  try {
    const units = await Unit.find({ status: { $in: [0, 1] } })
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching units" });
  }
});

// ===================== COLOR =====================
const createColor = asyncHandler(async (req, res) => {
  try {
    const { name, hexcode, status } = req.body;
    const newColor = new Color({ name, hexcode, status, user: req.body.user });
    await newColor.save();
    res.status(201).json({ msg: "Color created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Color creation failed" });
  }
});

const updateColor = asyncHandler(async (req, res) => {
  try {
    const colorId = req.params.id;
    const { name, hexcode, status } = req.body;
    const updatedColor = await Color.findByIdAndUpdate(
      colorId,
      { name, hexcode, status },
      { new: true, runValidators: true }
    );
    if (!updatedColor) return res.status(404).json({ msg: "Color not found" });
    res.status(200).json({ msg: "Color updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Color update failed" });
  }
});

const getAllColors = asyncHandler(async (req, res) => {
  try {
    const colors = await Color.find({ status: { $in: [0, 1] } })
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(colors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching colors" });
  }
});

// ===================== BRAND =====================
const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name, Image, status } = req.body;
    if (!name || !Image || !status)
      res.status(400).json({ msg: "All fields are required" });
    const newBrand = new Brand({ name, Image, status, user: req.body.user });
    await newBrand.save();
    res.status(201).json({ msg: "Brand created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Brand creation failed" });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const brandId = req.params.id;
    const { name, Image, status } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      { name, Image, status },
      { new: true, runValidators: true }
    );
    if (!updatedBrand) return res.status(404).json({ msg: "Brand not found" });
    res.status(200).json({ msg: "Brand updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Brand update failed" });
  }
});

const getBrandById = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("user");
    if (!brand) return res.status(404).json({ msg: "Brand not found" });
    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching brand" });
  }
});

const getAllBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find({ status: { $in: [0, 1] } })
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching brands" });
  }
});

// ===================== SIZE =====================
const createSize = asyncHandler(async (req, res) => {
  try {
    const { name, measurement, status } = req.body;
    const newSize = new Size({
      name,
      measurement,
      status,
      user: req.body.user,
    });
    await newSize.save();
    res.status(201).json({ msg: "Size created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Size creation failed" });
  }
});

const updateSize = asyncHandler(async (req, res) => {
  try {
    const sizeId = req.params.id;
    const { name, measurement, status } = req.body;
    const updatedSize = await Size.findByIdAndUpdate(
      sizeId,
      { name, measurement, status },
      { new: true, runValidators: true }
    );
    if (!updatedSize) return res.status(404).json({ msg: "Size not found" });
    res.status(200).json({ msg: "Size updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Size update failed" });
  }
});

const getAllSizes = asyncHandler(async (req, res) => {
  try {
    const sizes = await Size.find({ status: { $in: [0, 1] } })
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(sizes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching sizes" });
  }
});

// ===================== EXPORT =====================
module.exports = {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  createSubCategory,
  updateSubCategory,
  getAllSubCategories,
  createUnit,
  updateUnit,
  getAllUnits,
  createColor,
  updateColor,
  getAllColors,
  createBrand,
  updateBrand,
  getBrandById,
  getAllBrands,
  createSize,
  updateSize,
  getAllSizes,
};
