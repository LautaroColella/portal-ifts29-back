const notificationRepository = require("../repositories/notificationRepository");

const { validateId } = require("../validators/idValidator");
const {
  validateNotificationFilters,
} = require("../validators/notificationValidation");

const NotFoundError = require("../errors/NotFoundError");

const createNotification = async (data) => {
  return await notificationRepository.create(data);
};

const getUserNotifications = async (userId, filters) => {
  const validatedUserId = validateId(userId);
  const validatedFilters = validateNotificationFilters(filters);

  return await notificationRepository.findAllByUserId(
    validatedUserId,
    validatedFilters,
  );
};

const markAsRead = async (id) => {
  const validatedId = validateId(id);

  const notification = await notificationRepository.findById(validatedId);

  if (!notification) {
    throw new NotFoundError("Notificación no encontrada");
  }

  return await notificationRepository.markAsRead(validatedId);
};

const markAllAsRead = async (userId) => {
  const validatedUserId = validateId(userId);

  await notificationRepository.markAllAsRead(validatedUserId);
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
