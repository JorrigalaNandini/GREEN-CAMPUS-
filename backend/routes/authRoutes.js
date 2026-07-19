const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Logged-in User Profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;