const asyncHandler = require("express-async-handler");
const Favorite = require("../models/favorite");

const createFavorite = asyncHandler(async (req, res) => {
  try {
    const { item } = req.body;
    console.log(item);
    const existingFavorite = await Favorite.findOne({ item });

    if (existingFavorite) {
      return res.status(400).json({ msg: "Item is already a favorite" });
    }

    const newFavorite = new Favorite({
      item,
      customerId: req.user._id,
    });

    await newFavorite.save();
    res.status(201).json({ msg: "Favorite Added!" });
  } catch (error) {
    console.log(error);
    res.status(201).json(error);
  }
});

const getFavoriteByUser = asyncHandler(async (req, res) => {
  try {
    const clientId = req.user._id;
    const client = await Favorite.find({ customerId: clientId })
      .populate("item")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getFavorites = asyncHandler(async (req, res) => {
  try {
    const favorite = await Favorite.find().sort("-createdAt");
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json(error);
  }
});

const removeFavorite = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Favorite removed" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  createFavorite,
  getFavoriteByUser,
  getFavorites,
  removeFavorite,
};
