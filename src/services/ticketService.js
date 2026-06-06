const ticketRepository = require("../repositories/ticketRepository");
const commentRepository = require("../repositories/commentRepository");
const messageRepository = require("../repositories/messageRepository");
const ticketHistoryRepository = require("../repositories/ticketHistoryRepository");
const notificationService = require("../services/notificationService");

const { validatePagination } = require("../validators/paginationValidator");
const {
  validateTicketFilters,
} = require("../validators/ticketFiltersValidator");
const { validateCreateTicket } = require("../validators/createTicketValidator");
const { validateTicketId } = require("../validators/ticketIdValidator");
const {
  validateTicketStatus,
} = require("../validators/updateTicketStatusValidator");
const {
  validateCreateComment,
} = require("../validators/createCommentValidator");

const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");

const {
  createTicketCreatedHistory,
  createStatusChangedHistory,
  createCommentAddedHistory,
  createMessageAddedHistory,
} = require("../helpers/ticketHistory");
const { addTicketLabels, addHistoryLabels } = require("../helpers/ticketLabel");

const getAllTickets = async ({ page, limit, title }) => {
  const validatedPagination = validatePagination(page, limit);
  const validatedFilters = validateTicketFilters({ title });

  const result = await ticketRepository.findAll({
    ...validatedPagination,
    ...validatedFilters,
  });

  result.data = result.data.map(addTicketLabels);
  return result;
};

const getTicketById = async (id) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  ticket.history = ticket.history.map(addHistoryLabels);

  return addTicketLabels(ticket);
};

const createTicket = async (ticketData) => {
  const validatedTicket = validateCreateTicket(ticketData);

  const createdTicket = await ticketRepository.create(validatedTicket);

  await ticketHistoryRepository.createHistoryEntry(
    createTicketCreatedHistory(createdTicket.id),
  );

  if (createdTicket.assignedTo) {
    await notificationService.createNotification({
      message: `Nuevo ticket #${createdTicket.id} asignado: ${createdTicket.title}`,
      type: "TICKET_CREATED",
      ticket: { id: createdTicket.id },
      recipient: { id: createdTicket.assignedTo.id },
    });
  }

  return createdTicket;
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

  await ticketHistoryRepository.createHistoryEntry(
    createStatusChangedHistory({
      ticketId: validatedId,
      oldStatus: ticket.status,
      newStatus: validatedStatus,
    }),
  );

  if (ticket.createdBy) {
    await notificationService.createNotification({
      message: `Ticket #${validatedId} cambió estado a ${validatedStatus}`,
      type: "STATUS_CHANGED",
      ticket: { id: validatedId },
      recipient: { id: ticket.createdBy.id },
    });
  }

  return updatedTicket;
};

const deleteTicket = async (id) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  await ticketRepository.deleteTicket(validatedId);
};

const getAllComments = async (id) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  return await commentRepository.findAllByTicketId(validatedId);
};

const createComment = async (id, commentData) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const validatedComment = validateCreateComment(commentData);

  const comment = await commentRepository.createComment({
    ...validatedComment,

    ticket: {
      id: validatedId,
    },

    // !PLACEHOLDER
    author: null,
  });

  await ticketHistoryRepository.createHistoryEntry(
    createCommentAddedHistory(validatedId),
  );

  if (ticket.assignedTo) {
    await notificationService.createNotification({
      message: `Nuevo comentario en ticket #${validatedId}`,
      type: "COMMENT_ADDED",
      ticket: { id: validatedId },
      recipient: { id: ticket.assignedTo.id },
    });
  }

  return comment;
};

const getAllMessages = async (id) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  return await messageRepository.findAllByTicketId(validatedId);
};

const createMessage = async (id, messageData) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const validatedMessage = validateCreateComment(messageData);

  const message = await messageRepository.createMessage({
    ...validatedMessage,

    ticket: {
      id: validatedId,
    },

    // !PLACEHOLDER
    author: null,
  });

  await ticketHistoryRepository.createHistoryEntry(
    createMessageAddedHistory(validatedId),
  );

  if (ticket.createdBy) {
    await notificationService.createNotification({
      message: `Nuevo mensaje en ticket #${validatedId}`,
      type: "MESSAGE_ADDED",
      ticket: { id: validatedId },
      recipient: { id: ticket.createdBy.id },
    });
  }

  return message;
};

const getTicketHistory = async (id) => {
  const validatedId = validateTicketId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const history = await ticketHistoryRepository.findAllByTicketId(validatedId);

  return history.map(addHistoryLabels);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  deleteTicket,
  getAllComments,
  createComment,
  getAllMessages,
  createMessage,
  getTicketHistory,
};
