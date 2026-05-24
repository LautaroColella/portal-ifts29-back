const ticketRepository = require("../repositories/ticketRepository");
const { validatePagination } = require("../validators/paginationValidator");
const {
  validateTicketFilters,
} = require("../validators/ticketFiltersValidator");
const { validateCreateTicket } = require("../validators/createTicketValidator");

const getAllTickets = async ({ page, limit, title }) => {
  const validatedPagination = validatePagination(page, limit);
  const validatedFilters = validateTicketFilters({ title });

  return await ticketRepository.findAll({
    ...validatedPagination,
    ...validatedFilters,
  });
};

const createTicket = async (ticketData) => {
  const validatedTicket = validateCreateTicket(ticketData);

  return await ticketRepository.create(validatedTicket);
};

const updateTicketStatus = async (id, status) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const validatedStatus = validateTicketStatus(status);

  const updatedTicket = await ticketRepository.updateStatus(
    validatedId,
    validatedStatus,
  );

  return updatedTicket;
};

module.exports = {
  getAllTickets,
  createTicket,
  updateTicketStatus,
};
