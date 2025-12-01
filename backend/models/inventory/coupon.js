const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    code: String,
    value: Number,
    expire: {
      type: Boolean,
      default: false,
    },
    expireDate: Date,
    maximumClient: Number,
    usedCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    type: {
      type: String,
      enum: ["Percentage", "Fixed"],
      default: "Percentage",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
