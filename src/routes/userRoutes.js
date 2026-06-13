const express = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserRole,
  updateUserStaffSettings,
  deleteUser,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.post("/", authMiddleware, createUser);
router.patch("/:id", authMiddleware, updateUserProfile);
router.patch("/:id/role", authMiddleware, updateUserRole);
router.patch("/:id/staff-settings", authMiddleware, updateUserStaffSettings);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
