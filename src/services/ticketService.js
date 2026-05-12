const ticketRepository = require("../repositories/ticketRepository");
const { validatePagination } = require("../validators/paginationValidator");

const getAllTickets = async (page, limit) => {
  const validated = validatePagination(page, limit);

  return await ticketRepository.findAll(validated.page, validated.limit);
};

module.exports = {
  getAllTickets,
};
