const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
    },
    url: {
      type: String,
    },
    icon: {
      type: String,
    },
    subMenu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubMenu",
      },
    ],
    priority: {
      type: Number,
    },
    Status: {
      type: String,
      enum: [0, 1, 2],
      default: 0,
    },
    Deleted: {
      type: String,
      enum: [0, 1],
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
  },

  { timestamps: true }
);

const menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu: menu };
