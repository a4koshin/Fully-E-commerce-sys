const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("District", locationsSchema);
