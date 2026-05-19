const ticketRepository = require("../repositories/ticketRepository");
const { validatePagination } = require("../validators/paginationValidator");
const {
  validateTicketFilters,
} = require("../validators/ticketFiltersValidator");
const { validateCreateTicket } = require("../validators/createTicketValidator");
const { validateTicketId } = require("../validators/ticketIdValidator");
const NotFoundError = require("../errors/NotFoundError");

const getAllTickets = async ({ page, limit, title }) => {
  const validatedPagination = validatePagination(page, limit);
  const validatedFilters = validateTicketFilters({ title });

  return await ticketRepository.findAll({
    ...validatedPagination,
    ...validatedFilters,
  });
};

const getTicketById = async (id) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  return ticket;
};

const createTicket = async (ticketData) => {
  const validatedTicket = validateCreateTicket(ticketData);

  return await ticketRepository.create(validatedTicket);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
};
