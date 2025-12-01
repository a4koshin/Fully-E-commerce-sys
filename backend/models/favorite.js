const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
