const express = require("express");

const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.patch("/:id/status", updateTicketStatus);

module.exports = router;
