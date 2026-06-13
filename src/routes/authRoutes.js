const express = require("express");

const { me, login, changePassword } = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/me", authMiddleware, me);
router.post("/login", login);
router.patch("/change-password", authMiddleware, changePassword);

module.exports = router;
