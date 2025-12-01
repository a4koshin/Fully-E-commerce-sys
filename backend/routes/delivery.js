const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const {
  createDelivery,
  getAllDeliveries,
  updateDelivery,
  getMyDeliveries,
} = require("../controller/delivery");

const router = express.Router();

router.post("/", createDelivery);
router.get("/deliveries", getAllDeliveries);
router.get("/", userAuth, getMyDeliveries);
router.put("/:id", updateDelivery);
module.exports = router;
