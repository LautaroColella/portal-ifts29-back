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

module.exports = {
  getAllTickets,
};
