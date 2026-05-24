const ticketRepository = require("../repositories/ticketRepository");
const { validatePagination } = require("../validators/paginationValidator");
const {
  validateTicketFilters,
} = require("../validators/ticketFiltersValidator");
const { validateCreateTicket } = require("../validators/createTicketValidator");
const { validateTicketId } = require("../validators/ticketIdValidator");
const {
  validateTicketStatus,
} = require("../validators/updateTicketStatusValidator");
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

const updateTicketStatus = async (id, statusData) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const validatedStatus = validateTicketStatus(statusData);

  const updatedTicket = await ticketRepository.updateStatus(
    validatedId,
    validatedStatus,
  );

  return updatedTicket;
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
};
