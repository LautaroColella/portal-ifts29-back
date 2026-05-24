const express = require("express");

const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  deleteTicket,
  getAllComments,
  createComment,
  getAllMessages,
  createMessage,
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.patch("/:id/status", updateTicketStatus);
router.delete("/:id", deleteTicket);

router.get("/:id/comments", getAllComments);
router.post("/:id/comments", createComment);

router.get("/:id/messages", getAllMessages);
router.post("/:id/messages", createMessage);

module.exports = router;
