const notificationRepository = require("../repositories/notificationRepository");

const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const { validateId } = require("../validators/idValidator");

const authorizeNotificationAccess = async (req, res, next) => {
  try {
    const notificationId = validateId(req.params.id);

    const notification = await notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotFoundError("Notificación no encontrada");
    }

    if (notification.recipient.id !== req.user.id) {
      throw new ForbiddenError("No autorizado");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeNotificationAccess,
};
