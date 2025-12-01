const express = require("express");
const router = express.Router();
const {
  createClient,
  loginClient,
  getAllClients,
  updateClient,
  getClientById,
  verifyClient,
} = require("../controller/user");

// POST
router.post("/login", loginClient);
router.post("/register", createClient);
//router.post("/register", upload.single("profileImage"), createClient);

// GET
router.get("/", getAllClients);
router.get("/user/:id", getClientById);
router.get("/verify/:email", verifyClient);
//PUT
router.put("/client/:id", updateClient);
//router.put("/client/change-password/:id", changePassword);

//DELETE

module.exports = router;
