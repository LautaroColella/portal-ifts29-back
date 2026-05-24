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
const ValidationError = require("../errors/ValidationError");

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

  const INVALID_STATUS_TRANSITIONS = {
    CLOSED: [
      "OPEN",
      "IN_PROGRESS",
      "WAITING_FOR_STUDENT",
      "WAITING_FOR_THIRD_PARTY",
      "RESOLVED",
    ],

    CANCELLED: [
      "OPEN",
      "IN_PROGRESS",
      "WAITING_FOR_STUDENT",
      "WAITING_FOR_THIRD_PARTY",
      "RESOLVED",
    ],
  };

  if (INVALID_STATUS_TRANSITIONS[ticket.status]?.includes(validatedStatus)) {
    throw new ValidationError(
      `No se puede cambiar un ticket de estado ${ticket.status} a ${validatedStatus}`,
    );
  }

  const updateData = {
    status: validatedStatus,
  };

  if (validatedStatus === "RESOLVED") {
    updateData.resolvedAt = new Date();
  }

  if (validatedStatus === "CLOSED" || validatedStatus === "CANCELLED") {
    updateData.closedAt = new Date();
  }

  const updatedTicket = await ticketRepository.updateStatus(
    validatedId,
    updateData,
  );

  return updatedTicket;
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
};
