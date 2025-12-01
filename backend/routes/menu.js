const express = require("express");
const router = express.Router();
const {
  createMenu,
  getmenus,
  getMenuBySlug,
  assignMenu,
  updateMenu,
  createSubMenu,
  updateSubMenu,
  getSubmenus,
  removeMenu,
} = require("../controller/menu");

const { providerAuth } = require("../middlewares/authMiddleware");

// POST
router.post("/", providerAuth, createMenu);
router.post("/sub-menu", providerAuth, createSubMenu);

// GET
router.get("/", providerAuth, getmenus);
router.get("/sub-menus", providerAuth, getSubmenus);
router.get("/:slug", providerAuth, getMenuBySlug);

//PUT
router.put("/update/:id", providerAuth, updateMenu);
router.put("/sub-menu/update/:id", providerAuth, updateSubMenu);
router.put("/assign/:id", providerAuth, assignMenu);
router.put("/remove/:id", providerAuth, removeMenu);

module.exports = router;
