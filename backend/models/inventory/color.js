const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    hexcode: String,
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
