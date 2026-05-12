const ticketRepository = require("../repositories/ticketRepository");

const getAllTickets = async (page, limit) => {
  return await ticketRepository.findAll(page, limit);
};

module.exports = {
  getAllTickets,
};
