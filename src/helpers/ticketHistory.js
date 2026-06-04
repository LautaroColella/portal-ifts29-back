const createTicketCreatedHistory = (ticketId, performedById) => ({
  action: "TICKET_CREATED",
  oldValue: null,
  newValue: null,
  description: "Ticket creado",

  ticket: {
    id: ticketId,
  },

  performedBy: {
    id: performedById,
  },
});

const createStatusChangedHistory = (
  { ticketId, oldStatus, newStatus },
  performedById,
) => ({
  action: "STATUS_CHANGED",
  oldValue: oldStatus,
  newValue: newStatus,
  description: `Estado cambiado de ${oldStatus} a ${newStatus}`,

  ticket: {
    id: ticketId,
  },

  performedBy: {
    id: performedById,
  },
});

const createCommentAddedHistory = (ticketId, performedById) => ({
  action: "COMMENT_ADDED",
  oldValue: null,
  newValue: null,
  description: "Comentario agregado",

  ticket: {
    id: ticketId,
  },

  performedBy: {
    id: performedById,
  },
});

const createMessageAddedHistory = (ticketId, performedById) => ({
  action: "MESSAGE_ADDED",
  oldValue: null,
  newValue: null,
  description: "Mensaje agregado",

  ticket: {
    id: ticketId,
  },

  performedBy: {
    id: performedById,
  },
});

module.exports = {
  createTicketCreatedHistory,
  createStatusChangedHistory,
  createCommentAddedHistory,
  createMessageAddedHistory,
};
