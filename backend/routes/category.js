const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  getCategoryById,
  getAllCategories,
  createSubCategory,
  updateSubCategory,
  getAllSubCategories,
  createUnit,
  updateUnit,
  getAllUnits,
  createColor,
  updateColor,
  getAllColors,
  createBrand,
  updateBrand,
  getBrandById,
  getAllBrands,
  createSize,
  updateSize,
  getAllSizes,
} = require("../controller/category");
const { userAuth, providerAuth } = require("../middlewares/authMiddleware");

router.use(userAuth);

// ===================== POST =====================
router.post("/", createCategory);
router.post("/subCategory", createSubCategory);
router.post("/unit", createUnit);
router.post("/color", createColor);
router.post("/brand", createBrand);
router.post("/size", createSize); // Size creation

// ===================== GET =====================
router.get("/", getAllCategories);
router.get("/subCategories", getAllSubCategories);
router.get("/units", getAllUnits);
router.get("/colors", getAllColors);
router.get("/brands", getAllBrands);
router.get("/brand/:id", getBrandById);
router.get("/sizes", getAllSizes); // Get all sizes
router.get("/:id", getCategoryById);

// ===================== PUT =====================
router.put("/:id", updateCategory);
router.put("/subCategories/:id", updateSubCategory);
router.put("/unit/:id", updateUnit);
router.put("/color/:id", updateColor);
router.put("/brand/:id", updateBrand);
router.put("/size/:id", updateSize); // Update size

// ===================== DELETE =====================
// You can add delete routes as needed

module.exports = router;
