const asyncHandler = require("express-async-handler");
const Item = require("../models/inventory/items");
const Provider = require("../models/provider");
const cloudinary = require("../utils/cloudinary");

const createItem = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      featured,
      price,
      inStock,
      category,
      subcategory,
      published,
      colors,
      unit,
    } = req.body;
     
    let slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existName = await Item.findOne({ slug });

    if (existName) {
      const generateRandomString = () =>
        Math.random().toString(36).substr(2, 5);
      slug = `${slug}-${generateRandomString()}`;
    }
    // const user = await Provider.findById(req.body.user);

    // if (!user) {
    //   return res.status(404).json({ msg: "User not found" });
    // }

    const nameExixt = await Item.findOne({ name: name });
    if (nameExixt) {
      return res.status(400).json({ msg: "Item name already exist" });
    }
    // Handle image file
    const imageFile = req.files?.image;
    let imageUrl;
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: "products",
      });
      imageUrl = uploadResult.secure_url;
    }


    const newItem = new Item({
      name,
      unit,
      desc,
      featured,
      price,
      inStock,
      slug,
      category,
      image:imageUrl,
      subcategory,
      colors,
      published,
      user: req.body.user,
    });

    const createdItem = await newItem.save();
    res.status(201).json({ msg: "Item created successfully" });
  } catch (error) {
    console.log(error);
    res.status(201).json(error);
  }
});

const updateItem = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;

    const {
      name,
      desc,
      featured,
      price,
      discPrice,
      inStock,
      deliveryTime,
      category,
      subcategory,
      unit,
    } = req.body;


    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        desc,
        featured,
        price,
        discPrice,
        inStock,
        deliveryTime,
        category,
        subcategory,
        unit,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ msg: "Item Updated successfully" });
  } catch (error) {
    res.status(201).json(error);
  }
});

const getItemById = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findById(itemId);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ status: { $in: [0, 1] } })
    .populate(["user", "category", "subcategory", "unit",  "colors"])
    .sort({ createdAt: -1 });
  res.status(200).json(items);
});

const getPublicItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ status: { $in: [0, 1] } })
    .populate(["category", "subcategory", "unit",  "colors"])
    .sort({ createdAt: -1 });
  res.status(200).json(items);
});

const getItemBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const item = await Item.findOne({ slug });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});

const getFeaturedItems = asyncHandler(async (req, res) => {
  const featuredItems = await Item.find({
    featured: true,
    status: { $in: [0, 1] },
  }).sort({ createdAt: -1 });
  res.status(200).json(featuredItems);
});

const updateFeaturedStatus = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { featured: req.body.featured },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(201).json(error);
  }
});

//
const deleteItem = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { status: 2 },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(201).json(error);
  }
});

const createArrayItem = asyncHandler(async (req, res) => {
  try {
    const { item, type } = req.body;

    const { id } = req.params;
    if (type === "size") {
      const product = await Item.findById(id);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      const sizeExists = product.sizes.some((size) => size.toString() === item);

      if (sizeExists) {
        return res.status(400).json({ msg: "Size already exists" });
      }

      product.sizes.push(item);
      await product.save();

      res.status(201).json({ msg: "Added successfully", type });
    }
    if (type === "color") {
      const product = await Item.findById(id);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      const colorExist = product.colors.some(
        (color) => color.toString() === item
      );

      if (colorExist) {
        return res.status(400).json({ msg: "color already exists" });
      }

      product.colors.push(item);
      await product.save();

      res.status(201).json({ msg: "Added successfully", type });
    } else if (type === "sizeRemove") {
      const product = await Item.findById(id);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      product.sizes = product.sizes.filter((size) => size.toString() !== item);
      await product.save();
      res.status(201).json({ msg: "Removed successfully", type });
    } else if (type === "colorRemove") {
      const product = await Item.findById(id);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      product.colors = product.colors.filter(
        (color) => size.toString() !== item
      );
      await product.save();
      res.status(201).json({ msg: "Removed successfully", type });
    }
  } catch (error) {
    console.log(error);
    res.status(201).json(error);
  }
});

module.exports = {
  createItem,
  updateItem,
  getItemById,
  getAllItems,
  getItemBySlug,
  getFeaturedItems,
  updateFeaturedStatus,
  deleteItem,
  createArrayItem,
  getPublicItems
};
