const ticketService = require("../services/ticketService");
const asyncHandler = require("../helpers/asyncHandler");

const getAllTickets = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, title } = req.query;

  const tickets = await ticketService.getAllTickets({ page, limit, title });

  return res.status(200).json(tickets);
});

const getTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await ticketService.getTicketById(id);

  return res.status(200).json(ticket);
});

const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body, req.user.id);

  return res.status(201).json(ticket);
});

const updateTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedTicket = await ticketService.updateTicketStatus(id, req.body);

  return res.status(200).json(updatedTicket);
});

const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await ticketService.deleteTicket(id);

  return res.status(204).send();
});

const getAllComments = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comments = await ticketService.getAllComments(id);

  return res.status(200).json(comments);
});

const createComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await ticketService.createComment(id, req.body, req.user.id);

  return res.status(201).json(comment);
});

const getAllMessages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const messages = await ticketService.getAllMessages(id);

  return res.status(200).json(messages);
});

const createMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const message = await ticketService.createMessage(id, req.body, req.user.id);

  return res.status(201).json(message);
});

const getTicketHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const history = await ticketService.getTicketHistory(id);

  return res.status(200).json(history);
});

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
