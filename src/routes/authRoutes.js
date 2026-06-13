const express = require("express");

const {
  me,
  login,
  register,
  changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/me", authMiddleware, me);
router.post("/login", login);
router.post("/register", register);
router.patch("/change-password", authMiddleware, changePassword);

module.exports = router;
