const createTicketCreatedHistory = (ticketId) => ({
  action: "TICKET_CREATED",
  oldValue: null,
  newValue: null,
  description: "Ticket creado",

  ticket: {
    id: ticketId,
  },

  // !PLACEHOLDER
  performedBy: null,
});

const createStatusChangedHistory = ({ ticketId, oldStatus, newStatus }) => ({
  action: "STATUS_CHANGED",
  oldValue: oldStatus,
  newValue: newStatus,
  description: `Estado cambiado de ${oldStatus} a ${newStatus}`,

  ticket: {
    id: ticketId,
  },

  // !PLACEHOLDER
  performedBy: null,
});

const createCommentAddedHistory = (ticketId) => ({
  action: "COMMENT_ADDED",
  oldValue: null,
  newValue: null,
  description: "Comentario agregado",

  ticket: {
    id: ticketId,
  },

  // !PLACEHOLDER
  performedBy: null,
});

const createMessageAddedHistory = (ticketId) => ({
  action: "MESSAGE_ADDED",
  oldValue: null,
  newValue: null,
  description: "Mensaje agregado",

  ticket: {
    id: ticketId,
  },

  // !PLACEHOLDER
  performedBy: null,
});

module.exports = {
  createTicketCreatedHistory,
  createStatusChangedHistory,
  createCommentAddedHistory,
  createMessageAddedHistory,
};
