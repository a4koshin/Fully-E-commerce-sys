const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", unitSchema);
