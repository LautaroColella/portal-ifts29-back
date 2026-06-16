const notificationService = require("../services/notificationService");
const asyncHandler = require("../helpers/asyncHandler");

const getUserNotifications = asyncHandler(async (req, res) => {
  const { unreadOnly } = req.query;

  const notifications = await notificationService.getUserNotifications(
    req.user.id,
    { unreadOnly },
  );

  return res.status(200).json(notifications);
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(
    req.params.id,
    req.user.id,
  );

  return res.status(200).json(notification);
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user.id);

  return res.status(204).send();
});

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
