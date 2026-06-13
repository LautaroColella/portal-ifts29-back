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
const authorizeRoles = require("../middlewares/role");
const { authorizeSelfOrAdmin } = require("../middlewares/ownership");

const router = express.Router();

router.get("/", authMiddleware, authorizeRoles("ADMIN"), getAllUsers);
router.post("/", authMiddleware, authorizeRoles("ADMIN"), createUser);
router.patch(
  "/:id/role",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUserRole,
);
router.patch(
  "/:id/staff-settings",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUserStaffSettings,
);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

router.get("/:id", authMiddleware, authorizeSelfOrAdmin, getUserById);
router.patch("/:id", authMiddleware, authorizeSelfOrAdmin, updateUserProfile);

module.exports = router;
