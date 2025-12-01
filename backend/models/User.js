const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
     image: {
      type: String,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: String,
      enum: ["user", "driver"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
