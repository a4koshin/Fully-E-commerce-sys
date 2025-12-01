const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: String,
    slug: {
      type: String,
    },
    desc: String,
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    price: Number,
    discPrice: Number,
    inStock: Number,
    image: String,
    deliveryTime: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
      },
    ],
    colors: [

          {type: mongoose.Schema.Types.ObjectId,
          ref: "Color",
        },

    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
