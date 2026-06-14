const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Message");
};

const findAllByTicketId = async (ticketId) => {
  const messageRepository = getRepository();

  return await messageRepository.find({
    where: {
      ticket: {
        id: ticketId,
      },
    },

    relations: {
      author: true,
    },

    order: {
      createdAt: "ASC",
    },
  });
};

const createMessage = async (messageData) => {
  const messageRepository = getRepository();

  const message = messageRepository.create(messageData);

  return await messageRepository.save(message);
};

module.exports = {
  findAllByTicketId,
  createMessage,
};
