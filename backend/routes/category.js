const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategory,
  createSubCategory,
  getAllSubCategories,
  createUnit,
  getAllUnits,
  createColor,
  getAllColors,
  updateSubCategory,
  updateUnit,
  updateColor,
} = require("../controller/category");


// POST
router.post("/", createCategory);
router.post("/subCategory", createSubCategory);
router.post("/unit", createUnit);
router.post("/color", createColor);

// GET
router.get("/", getAllCategories);
router.get("/subCategories", getAllSubCategories);
router.get("/units", getAllUnits);
router.get("/colors", getAllColors);

router.get("/:id", getCategoryById);

//PUT
router.put("/:id", updateCategory);
router.put("/subCategories/:id", updateSubCategory);
router.put("/unit/:id", updateUnit);
router.put("/color/:id", updateColor);

//DELETE
//router.delete("/delete/:id", deleteCategory);

module.exports = router;
