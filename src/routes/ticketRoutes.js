const express = require("express");

const {
  getAllTickets,
  getTicketById,
  createTicket,
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);

module.exports = router;
