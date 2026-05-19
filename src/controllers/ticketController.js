const ticketService = require("../services/ticketService");
const asyncHandler = require("../middlewares/asyncHandler");

const getAllTickets = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, title } = req.query;

  const tickets = await ticketService.getAllTickets({ page, limit, title });

  return res.status(200).json(tickets);
});

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketService.getTicketById(id);

    return res.status(200).json(ticket);
  } catch (err) {
    if (err.message === "Ticket no encontrado") {
      return res.status(404).json({
        error: err.message,
      });
    }

    return res.status(400).json({
      error: err.message,
    });
  }
};

const createTicket = asyncHandler(async (req, res) => {
  const ticket = await ticketService.createTicket(req.body);

  return res.status(201).json(ticket);
});

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
};
