const Review = require("../models/inventory/Reviews")

// Create Review
const createReview = async (req, res) => {
  const { productId, userId, rating, comment,country } = req.body;
  try {
    const review = await Review.create({ productId, userId, rating, comment,country });
    res.status(201).json({msg: 'create Review'});
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

// Get All Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("productId userId", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

module.exports={
    createReview,
    getReviews
}