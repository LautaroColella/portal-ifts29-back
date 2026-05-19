const ticketService = require("../services/ticketService");

const getAllTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, title } = req.query;

    const tickets = await ticketService.getAllTickets({ page, limit, title });

    return res.status(200).json(tickets);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ticketService.getTicketById(id);

    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
};

const createTicket = async (req, res) => {
  try {
    const ticket = await ticketService.createTicket(req.body);

    return res.status(201).json(ticket);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
};
