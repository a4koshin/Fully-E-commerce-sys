const mongoose = require("mongoose");

const UserOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    otp:{
        type: String
    },
    createdAt: {
        type: Date,
    },
    expired:{
        type: Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserOtp", UserOtpSchema);
