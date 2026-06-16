const { mapUserSummary } = require("./userResponse");

const { addTicketLabels, addHistoryLabels } = require("./ticketLabel");

const mapComment = (comment) => ({
  ...comment,

  author: mapUserSummary(comment.author),
});

const mapMessage = (message) => ({
  ...message,

  author: mapUserSummary(message.author),
});

const mapHistoryEntry = (historyEntry) => ({
  ...addHistoryLabels(historyEntry),

  performedBy: mapUserSummary(historyEntry.performedBy),
});

const mapTicketDetails = (ticket) => ({
  ...addTicketLabels(ticket),

  createdBy: mapUserSummary(ticket.createdBy),

  assignedTo: mapUserSummary(ticket.assignedTo),

  comments: ticket.comments?.map(mapComment) ?? [],

  messages: ticket.messages?.map(mapMessage) ?? [],

  history: ticket.history?.map(mapHistoryEntry) ?? [],
});

module.exports = {
  mapComment,
  mapMessage,
  mapHistoryEntry,
  mapTicketDetails,
};
