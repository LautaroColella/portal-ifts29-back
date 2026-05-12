const ticketRepository = require("../repositories/ticketRepository");
const { validatePagination } = require("../validators/paginationValidator");

const getAllTickets = async (filters) => {
  const validatedPagination = validatePagination(filters.page, filters.limit);

  return await ticketRepository.findAll({
    ...filters,
    ...validatedPagination,
  });
};

module.exports = {
  getAllTickets,
};
