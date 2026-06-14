const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Notification");
};

const findAllByUserId = async (userId, filters = {}) => {
  const repository = getRepository();

  const where = {
    recipient: {
      id: userId,
    },
  };

  if (filters.unreadOnly) {
    where.read = false;
  }

  return await repository.find({
    where,

    order: {
      createdAt: "DESC",
    },

    relations: {
      ticket: true,
    },
  });
};

const findById = async (id) => {
  return await getRepository().findOne({
    where: {
      id,
    },

    relations: {
      recipient: true,
    },
  });
};

const create = async (notificationData) => {
  const repository = getRepository();

  const notification = repository.create(notificationData);

  return await repository.save(notification);
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
    { read: true },
  );
};

module.exports = {
  findAllByUserId,
  findById,
  create,
  markAsRead,
  markAllAsRead,
};
