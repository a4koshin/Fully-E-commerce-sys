const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subcategorySchema);
