const express = require("express");
const router = express.Router();
const {
  registerProvider,
  loginProvider,
  getAllProviders,
  updateProvider,
  getProviderById,
  changePassword,
  forgotPassword,
  resetPassword,
  getProviderProfile,
} = require("../controller/provider");

const { providerAuth } = require("../middlewares/authMiddleware");

// POST
router.post("/register", registerProvider);
router.post("/login", loginProvider);

// GET
router.get("/", getAllProviders);
router.get("/user/:id", providerAuth, getProviderById);
router.get("/profile", providerAuth, getProviderProfile);

//PUT
router.put("/update/:id", updateProvider);
router.put("/user/change-password/:id", providerAuth, changePassword);

//DELETE

module.exports = router;
