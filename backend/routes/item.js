const express = require("express");
const router = express.Router();
const {
  createItem,
  updateItem,
  getItemById,
  getAllItems,
  getItemBySlug,
  getFeaturedItems,
  updateFeaturedStatus,
  deleteItem,
  createArrayItem,
  getPublicItems
} = require("../controller/item");

//const { upload } = require("../utils/fileUpload");

// POST
router.post("/", createItem);


// GET
router.get("/",getAllItems);
router.get("/featured", getFeaturedItems);
router.get("/item/:id", getItemById);
router.get("/item/slug/:slug", getItemBySlug);
router.get("/public", getPublicItems);

//PUT
router.put("/item/:id", updateItem);
router.put("/item/featured/:id", updateFeaturedStatus);
router.put("/item/array/:id", createArrayItem);

//DELETE
router.put("/item/delete/:id", deleteItem);

module.exports = router;
