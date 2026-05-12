const ticketService = require("../services/ticketService");

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();

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
