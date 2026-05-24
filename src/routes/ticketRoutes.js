const express = require("express");

const {
  getAllTickets,
  createTicket,
  updateTicketStatus,
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets);
router.post("/", createTicket);
router.patch("/:id/status", updateTicketStatus);

module.exports = router;
