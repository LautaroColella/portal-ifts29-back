const notificationService = require("../services/notificationService");
const asyncHandler = require("../helpers/asyncHandler");

const getUserNotifications = asyncHandler(async (req, res) => {
  const { userId, unreadOnly } = req.query;

  const notifications = await notificationService.getUserNotifications(userId, {
    unreadOnly: unreadOnly === "true",
  });

  return res.status(200).json(notifications);
});

const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await notificationService.markAsRead(id);

  return res.status(200).json(notification);
});

const markAllAsRead = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  await notificationService.markAllAsRead(userId);

  return res.status(200).json({ message: "Todas las notificaciones marcadas como leídas" });
});

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
