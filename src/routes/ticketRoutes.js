const express = require("express");

const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  deleteTicket,
  getAllComments,
  createComment,
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.patch("/:id/status", updateTicketStatus);
router.delete("/:id", deleteTicket);

router.get("/:id/comments", getAllComments);
router.post("/:id/comments", createComment);

module.exports = router;
