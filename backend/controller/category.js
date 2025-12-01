const Category = require('../models/inventory/category');
const color = require('../models/inventory/color');
const SubCategory = require('../models/inventory/subCategory');
const unit = require('../models/inventory/unit');
const Provider = require('../models/provider');
const asyncHandler = require("express-async-handler");
// const Item = require('../models/items');

// Function to create a new category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, desc, status } = req.body;
    const newCategory = new Category({ name, desc, status, user: req.body.user });
     await newCategory.save();
    res.status(201).json({msg: "Category created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Category creation failed' });
  }
});

// Function to update a category by ID
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, desc, status } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, desc, status },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(200).json({msg: "Category Updated successfully"});
  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: 'Category update failed' });
  }
});

// Function to get a category by ID
const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error fetching category' });
  }
});

// Function to get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({ status: { $in: [0, 1] }}).sort({createdAt: -1});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error fetching categories' });
  }
});




const createSubCategory = asyncHandler(async (req, res) => {
  try {
    const { name, category,status } = req.body;
    const newCategory = new SubCategory({ name, category,status, user: req.body.user });
    await newCategory.save();
    res.status(201).json({msg: "created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: ' creation failed' });
  }
});


const updateSubCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, category } = req.body;
    const updatedCategory = await SubCategory.findByIdAndUpdate(
      categoryId,
      { name, category },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(200).json({msg: "Updated Sub-category successfully"});
  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: ' update failed' });
  }
});

const getAllSubCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await SubCategory.find({ status: { $in: [0, 1] }})
    .populate('category').populate('user').sort({createdAt: -1});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error fetching categories' });
  }
});

const createUnit= asyncHandler(async (req, res) => {
  try {
    const { name,status } = req.body;
    //  const user = await Provider.findById(req.body.user);
    
    //     if (!user) {
    //       return res.status(404).json({ msg: "User not found" });
    //     }
    const newUnit = new unit({ name, status, user: req.body.user });
    await newUnit.save();
    res.status(201).json({msg: "created unit successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: ' creation failed' });
  }
});
const updateUnit = asyncHandler(async (req, res) => {
  try {
    const unitId = req.params.id;
    const { name, status } = req.body;
    const updatedUnity = await unit.findByIdAndUpdate(
      unitId,
      { name, status },
      { new: true, runValidators: true }
    );

    if (!updatedUnity) {
      return res.status(404).json({ msg: 'Unit not found' });
    }
    res.status(200).json({msg: "Updated Unit successfully"});
  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: ' update failed' });
  }
});


const getAllUnits = asyncHandler(async (req, res) => {
  try {
    const units = await unit.find({ status: { $in: [0, 1] }}).populate('user').sort({createdAt: -1});
    res.status(200).json(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error fetching categories' });
  }
});

const createColor= asyncHandler(async (req, res) => {
  try {
    const { name,status } = req.body;
    //  const user = await Provider.findById(req.body.user);
    
    //     if (!user) {
    //       return res.status(404).json({ msg: "User not found" });
    //     }
    const newColor = new color({ name, status, user: req.body.user });
    await newColor.save();
    res.status(201).json({msg: "created color successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: ' creation failed' });
  }
});

const getAllColors = asyncHandler(async (req, res) => {
  try {
    const colors = await color.find({ status: { $in: [0, 1] }}).populate('user').sort({createdAt: -1});
    res.status(200).json(colors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error fetching categories' });
  }
});
const updateColor = asyncHandler(async (req, res) => {
  try {
    const colorId = req.params.id;
    const { name, status } = req.body;
    const updatedColorly = await color.findByIdAndUpdate(
      colorId,
      { name, status },
      { new: true, runValidators: true }
    );

    if (!updatedColorly) {
      return res.status(404).json({ msg: 'Color not found' });
    }
    res.status(200).json({msg: "Updated Color successfully"});
  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: ' update failed' });
  }
});
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
    getAllColors,
    updateColor
}