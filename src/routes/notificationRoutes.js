const express = require("express");

const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");

const authMiddleware = require("../middlewares/auth");
const {
  authorizeNotificationAccess,
} = require("../middlewares/notificationAuthorization");

const router = express.Router();

router.get("/", authMiddleware, getUserNotifications);
router.patch(
  "/:id/read",
  authMiddleware,
  authorizeNotificationAccess,
  markAsRead,
);
router.patch("/read-all", authMiddleware, markAllAsRead);

module.exports = router;
