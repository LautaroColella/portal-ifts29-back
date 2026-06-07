const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Notification");
};

const findAllByUserId = async (userId) => {
  const notificationRepository = getRepository();

  return await notificationRepository.find({
    where: {
      recipient: {
        id: userId,
      },
    },

    order: {
      createdAt: "DESC",
    },

    relations: {
      ticket: true,
    },
  });
};

const findAllUnreadByUserId = async (userId) => {
  const notificationRepository = getRepository();

  return await notificationRepository.find({
    where: {
      recipient: {
        id: userId,
      },
      read: false,
    },

    order: {
      createdAt: "DESC",
    },

    relations: {
      ticket: true,
    },
  });
};

const createNotification = async (notificationData) => {
  const notificationRepository = getRepository();

  const notification = notificationRepository.create(notificationData);

  return await notificationRepository.save(notification);
};

const markAsRead = async (id) => {
  const notificationRepository = getRepository();

  await notificationRepository.update(id, { read: true });

  return await notificationRepository.findOne({
    where: { id },
  });
};

const markAllAsRead = async (userId) => {
  const notificationRepository = getRepository();

  await notificationRepository.update(
    { recipient: { id: userId } },
    { read: true }
  );
};

module.exports = {
  findAllByUserId,
  findAllUnreadByUserId,
  createNotification,
  markAsRead,
  markAllAsRead,
};
