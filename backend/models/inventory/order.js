const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    OrdId:{
      type: String,
    },
    orderItems: [
      {
        quantity: { type: Number },
        price: { type: Number },
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          
        },
      },
    ],
    address: {
      type: String,
    },
    customerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    couponCode: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Completed", "Cancelled"],
      default: "Pending",
    },
    shippingPrice: { type: Number, default: 0 },
    taxPrice: { type: Number, default:0 },
    totalPrice: { type: Number, required: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
