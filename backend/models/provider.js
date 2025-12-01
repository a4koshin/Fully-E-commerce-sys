const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    manager: {
      type: Boolean,
      default: false,
    },
    developer: {
      type: Boolean,
      default: false,
    },
    // branch: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Branch",
    // },
    // menus: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Menu",
    //   },
    // ],
    // submenus: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "SubMenu",
    //   },
    // ],
    roles: {
      type: String,
      enum: ["General Admin", "super Admin", "Entry"],
      default: "Entry",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);
