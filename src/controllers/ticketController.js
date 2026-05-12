const ticketService = require("../services/ticketService");

const getAllTickets = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const tickets = await ticketService.getAllTickets(page, limit);

    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch tickets",
    });
  }
};

module.exports = {
  getAllTickets,
};
