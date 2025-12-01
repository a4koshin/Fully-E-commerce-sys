const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/authMiddleware");
const {
  createFavorite,
  getFavoriteByUser,
  removeFavorite,
  getFavorites,
} = require("../controller/favorite");

router.post("/", userAuth, createFavorite);

// GET
router.get("/", getFavorites);
router.get("/client", userAuth, getFavoriteByUser);

//PUT

//DELETE
router.delete("/delete/:id", removeFavorite);

module.exports = router;
