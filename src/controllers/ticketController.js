const ticketService = require("../services/ticketService");

const getAllTickets = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, title } = req.query;

    const tickets = await ticketService.getAllTickets({ page, limit, title });

    return res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
};

const createTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket(req.body);

    return res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTickets,
  createTicket,
};
