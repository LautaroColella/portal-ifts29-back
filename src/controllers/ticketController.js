const ticketService = require("../services/ticketService");
const asyncHandler = require("../middlewares/asyncHandler");

const getAllTickets = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, title } = req.query;

  const tickets = await ticketService.getAllTickets({ page, limit, title });

  return res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);

  return res.status(201).json(ticket);
});

const updateTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedTicket = await ticketService.updateTicketStatus(id, status);

  return res.status(200).json(updatedTicket);
});

module.exports = {
  getAllTickets,
  createTicket,
  updateTicketStatus,
};
