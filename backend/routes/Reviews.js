const express = require("express");
const { createReview, getReviews } = require("../controller/Reviews");
const router = express.Router();


router.post("/", createReview);
router.get("/", getReviews);

module.exports = router;
