const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("TicketHistory");
};

const findAllByTicketId = async (ticketId) => {
  const historyRepository = getRepository();

  return await historyRepository.find({
    where: {
      ticket: {
        id: ticketId,
      },
    },

    order: {
      createdAt: "ASC",
    },
  });
};

const createHistoryEntry = async (historyData) => {
  const historyRepository = getRepository();

  const history = historyRepository.create(historyData);

  return await historyRepository.save(history);
};

module.exports = {
  findAllByTicketId,
  createHistoryEntry,
};
