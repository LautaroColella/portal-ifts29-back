const notificationRepository = require("../repositories/notificationRepository");

const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");

const createNotification = async (data) => {
  return await notificationRepository.createNotification(data);
};

const getUserNotifications = async (userId, filters = {}) => {
  if (!userId) {
    throw new ValidationError("userId es requerido");
  }

  if (filters.unreadOnly) {
    return await notificationRepository.findAllUnreadByUserId(userId);
  }

  return await notificationRepository.findAllByUserId(userId);
};

const markAsRead = async (id) => {
  const notification = await notificationRepository.markAsRead(id);

  if (!notification) {
    throw new NotFoundError("Notificación no encontrada");
  }

  return notification;
};

const markAllAsRead = async (userId) => {
  if (!userId) {
    throw new ValidationError("userId es requerido");
  }

  await notificationRepository.markAllAsRead(userId);
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
