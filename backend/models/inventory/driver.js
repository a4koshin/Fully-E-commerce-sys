const mongoose = require("mongoose");

const driverSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    vehicle: {
      carType: {
        type: String,
      },
      plateNumber: {
        type: String,
      },
      isOwner: {
        type: Boolean,
        default: false,
      },
    },
    image: String,
    // currentLocation:String,
    // totalDeliveries:Number,
    // completedToday:Number,
    // rating:Number,
    // currentDelivery:String,
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
