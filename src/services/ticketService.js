// REPOSITORIES
const ticketRepository = require("../repositories/ticketRepository");
const commentRepository = require("../repositories/commentRepository");
const messageRepository = require("../repositories/messageRepository");
const ticketHistoryRepository = require("../repositories/ticketHistoryRepository");
const userRepository = require("../repositories/userRepository");
const notificationService = require("../services/notificationService");

const STATUS_LABELS = {
  OPEN: "Abierto",
  IN_PROGRESS: "En Proceso",
  WAITING_FOR_STUDENT: "Esperando Estudiante",
  WAITING_FOR_THIRD_PARTY: "Esperando Terceros",
  RESOLVED: "Resuelto",
  CLOSED: "Cerrado",
  CANCELLED: "Cancelado",
};

// VALIDATORS
const { validatePagination } = require("../validators/paginationValidator");
const {
  validateTicketFilters,
} = require("../validators/ticketFiltersValidator");
const { validateCreateTicket } = require("../validators/createTicketValidator");
const { validateId } = require("../validators/idValidator");
const {
  validateTicketStatus,
} = require("../validators/updateTicketStatusValidator");
const {
  validateTicketAssignee,
} = require("../validators/updateTicketAssigneeValidator");
const {
  validateCreateComment,
} = require("../validators/createCommentValidator");

// ERRORS
const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");

// HELPERS
const {
  createTicketCreatedHistory,
  createStatusChangedHistory,
  createAssignedChangedHistory,
  createCommentAddedHistory,
  createMessageAddedHistory,
} = require("../helpers/ticketHistory");
const { addTicketLabels, addHistoryLabels } = require("../helpers/ticketLabel");
const { mapUserSummary } = require("../helpers/userResponse");
const {
  mapHistoryEntry,
  mapMessage,
  mapComment,
  mapTicketDetails,
} = require("../helpers/ticketResponse");

const getAllTickets = async (filters, currentUser) => {
  const validatedPagination = validatePagination(filters.page, filters.limit);

  const validatedFilters = validateTicketFilters({
    title: filters.title,
  });

  const result = await ticketRepository.findAll({
    ...validatedPagination,
    ...validatedFilters,
    currentUser,
  });

  result.data = result.data.map(addTicketLabels);

  return result;
};

const getTicketById = async (id) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  return mapTicketDetails(ticket);
};

const createTicket = async (ticketData, userId) => {
  const validatedTicket = validateCreateTicket(ticketData);

  const candidates = await userRepository.findResponsibleStaff(
    validatedTicket.subcategory,
  );

  let assignedStaff = null;

  if (candidates.length > 0) {
    const workloads = await Promise.all(
      candidates.map(async (staff) => ({
        staff,

        activeTickets: await ticketRepository.countAssignedActiveTickets(
          staff.id,
        ),
      })),
    );

    workloads.sort((a, b) => {
      if (a.activeTickets !== b.activeTickets) {
        return a.activeTickets - b.activeTickets;
      }

      return a.staff.id - b.staff.id;
    });

    assignedStaff = workloads[0].staff;
  }

  const createdTicket = await ticketRepository.create(
    {
      ...validatedTicket,
      assignedTo: assignedStaff ? { id: assignedStaff.id } : null,
    },
    userId,
  );

  await ticketHistoryRepository.createHistoryEntry(
    createTicketCreatedHistory(createdTicket.id, userId),
  );

  if (assignedStaff) {
    await ticketHistoryRepository.createHistoryEntry(
      createAssignedChangedHistory(
        createdTicket.id,
        userId,
        null,
        `${assignedStaff.firstName} ${assignedStaff.lastName}`,
      ),
    );
  }
  if (createdTicket.assignedTo) {
    await notificationService.createNotification({
      message: `Nuevo ticket #${createdTicket.id} asignado: ${createdTicket.title}`,
      type: "TICKET_CREATED",
      ticket: { id: createdTicket.id },
      recipient: { id: createdTicket.assignedTo.id },
    });
  }

  if (
    createdTicket.createdBy &&
    (!createdTicket.assignedTo ||
      createdTicket.createdBy.id !== createdTicket.assignedTo.id)
  ) {
    await notificationService.createNotification({
      message: `Nuevo ticket #${createdTicket.id} creado: ${createdTicket.title}`,
      type: "TICKET_CREATED",
      ticket: { id: createdTicket.id },
      recipient: { id: createdTicket.createdBy.id },
    });
  }

  return createdTicket;
};

const updateTicketStatus = async (id, statusData, userId) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const validatedStatus = validateTicketStatus(statusData);

  if (ticket.status === validatedStatus) {
    throw new ValidationError("El ticket ya posee ese estado");
  }

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
    createStatusChangedHistory(
      {
        ticketId: validatedId,
        oldStatus: ticket.status,
        newStatus: validatedStatus,
      },
      userId,
    ),
  );

  if (ticket.createdBy) {
    await notificationService.createNotification({
      message: `Ticket #${validatedId} cambió estado a ${STATUS_LABELS[validatedStatus] || validatedStatus}`,
      type: "STATUS_CHANGED",
      ticket: { id: validatedId },
      recipient: { id: ticket.createdBy.id },
    });
  }

  if (
    ticket.assignedTo &&
    (!ticket.createdBy || ticket.assignedTo.id !== ticket.createdBy.id)
  ) {
    await notificationService.createNotification({
      message: `Ticket #${validatedId} cambió estado a ${STATUS_LABELS[validatedStatus] || validatedStatus}`,
      type: "STATUS_CHANGED",
      ticket: { id: validatedId },
      recipient: { id: ticket.assignedTo.id },
    });
  }

  return updatedTicket;
};

const updateTicketAssignee = async (id, assigneeData, performedById) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const assignedToId = validateTicketAssignee(assigneeData);

  const assignedUser = await userRepository.findById(assignedToId);

  if (!assignedUser) {
    throw new NotFoundError("Usuario responsable no encontrado");
  }

  if (ticket.assignedTo?.id === assignedToId) {
    throw new ValidationError("El ticket ya está asignado a este usuario");
  }

  const updatedTicket = await ticketRepository.updateAssignee(
    validatedId,
    assignedToId,
  );

  const oldAssigneeName = ticket.assignedTo
    ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
    : null;

  const newAssigneeName = `${assignedUser.firstName} ${assignedUser.lastName}`;

  await ticketHistoryRepository.createHistoryEntry(
    createAssignedChangedHistory(
      validatedId,
      performedById,
      oldAssigneeName,
      newAssigneeName,
    ),
  );

  if (ticket.assignedTo && ticket.assignedTo.id !== assignedToId) {
    await notificationService.createNotification({
      message: `Ticket #${validatedId} fue reasignado correctamente a ${newAssigneeName}`,
      type: "ASSIGNED_CHANGED",
      ticket: { id: validatedId },
      recipient: { id: ticket.assignedTo.id },
    });
  }

  if (ticket.createdBy && ticket.createdBy.id !== ticket.assignedTo?.id) {
    await notificationService.createNotification({
      message: `Ticket #${validatedId} fue reasignado a ${newAssigneeName}`,
      type: "ASSIGNED_CHANGED",
      ticket: { id: validatedId },
      recipient: { id: ticket.createdBy.id },
    });
  }

  if (assignedToId !== ticket.createdBy?.id && assignedToId !== ticket.assignedTo?.id) {
    await notificationService.createNotification({
      message: `Se te asignó el ticket #${validatedId}`,
      type: "ASSIGNED_CHANGED",
      ticket: { id: validatedId },
      recipient: { id: assignedToId },
    });
  }

  return updatedTicket;
};

const deleteTicket = async (id) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  await ticketRepository.deleteTicket(validatedId);
};

const getAllComments = async (id) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const comments = await commentRepository.findAllByTicketId(validatedId);

  return comments.map(mapComment);
};

const createComment = async (id, commentData, userId) => {
  const validatedId = validateId(id);

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

    author: {
      id: userId,
    },
  });

  await ticketHistoryRepository.createHistoryEntry(
    createCommentAddedHistory(validatedId, userId),
  );

  if (ticket.assignedTo) {
    await notificationService.createNotification({
      message: `Nuevo comentario en ticket #${validatedId}`,
      type: "COMMENT_ADDED",
      ticket: { id: validatedId },
      recipient: { id: ticket.assignedTo.id },
    });
  }

  if (
    ticket.createdBy &&
    (!ticket.assignedTo || ticket.createdBy.id !== ticket.assignedTo.id)
  ) {
    await notificationService.createNotification({
      message: `Nuevo comentario en ticket #${validatedId}`,
      type: "COMMENT_ADDED",
      ticket: { id: validatedId },
      recipient: { id: ticket.createdBy.id },
    });
  }

  return comment;
};

const getAllMessages = async (id) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const messages = await messageRepository.findAllByTicketId(validatedId);
  return messages.map(mapMessage);
};

const createMessage = async (id, messageData, userId) => {
  const validatedId = validateId(id);

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

    author: {
      id: userId,
    },
  });

  await ticketHistoryRepository.createHistoryEntry(
    createMessageAddedHistory(validatedId, userId),
  );

  if (ticket.createdBy) {
    await notificationService.createNotification({
      message: `Nuevo mensaje en ticket #${validatedId}`,
      type: "MESSAGE_ADDED",
      ticket: { id: validatedId },
      recipient: { id: ticket.createdBy.id },
    });
  }

  if (
    ticket.assignedTo &&
    (!ticket.createdBy || ticket.assignedTo.id !== ticket.createdBy.id)
  ) {
    await notificationService.createNotification({
      message: `Nuevo mensaje en ticket #${validatedId}`,
      type: "MESSAGE_ADDED",
      ticket: { id: validatedId },
      recipient: { id: ticket.assignedTo.id },
    });
  }

  return message;
};

const getTicketHistory = async (id) => {
  const validatedId = validateId(id);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  const history = await ticketHistoryRepository.findAllByTicketId(validatedId);
  return history.map(mapHistoryEntry);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  updateTicketAssignee,
  deleteTicket,
  getAllComments,
  createComment,
  getAllMessages,
  createMessage,
  getTicketHistory,
};
