const express = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", authMiddleware, createUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
