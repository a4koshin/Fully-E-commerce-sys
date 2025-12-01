const express = require("express");
const router = express.Router();
const {
  createFunction,
  readFunction,
  readPublicFunction,
  updateFunction,
  DynamicupdateFunction,

  createDistrict,
  updateDistrict,
  getAllDistcrits,

  createCoupon,
  getAllCoupons,
  updateCoupon
} = require("../controller/setup/setup");
const {
  createSubCategory,
  updateSubCategory,
  getAllSubCategories,
} = require("../controller/category");
//const { providerAuth } = require("../middlewares/authMiddleware");

// POST
router.post("/:modelName",  createFunction);
router.post("/manual/subcategory",  createSubCategory);
router.post("/manual/district",  createDistrict);
router.post("/manual/coupon",  createCoupon);

// GET
router.get("/:modelName",  readFunction);
router.get("/:modelName/public", readPublicFunction);
router.get("/manual/subcategory", getAllSubCategories);
router.get("/manual/district",  getAllDistcrits);
router.get("/manual/coupon",  getAllCoupons);

//PUT
router.put("/:modelName/update/:id",  updateFunction);
router.put("/manual/subcategory/update/:id",  updateSubCategory);
router.put("/manual/district/update/:id",  updateDistrict);
router.put("/manual/coupon/update/:id",  updateCoupon);
router.put(
  "/:modelName/dynamicupdate/:id",
  
  DynamicupdateFunction
);

module.exports = router;
