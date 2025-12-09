// models/SubCategory.js
const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
