const ticketRepository = require("../repositories/ticketRepository");

const getAllTickets = async () => {
  return await ticketRepository.findAll();
};

module.exports = {
  getAllTickets,
};
