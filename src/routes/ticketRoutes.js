const express = require("express");

const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicketStatus,
  updateTicketAssignee,
  deleteTicket,
  getAllComments,
  createComment,
  getAllMessages,
  createMessage,
  getTicketHistory,
} = require("../controllers/ticketController");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", authMiddleware, getAllTickets);
router.get("/:id", authMiddleware, getTicketById);
router.post("/", authMiddleware, createTicket);
router.patch("/:id/status", authMiddleware, updateTicketStatus);
router.patch("/:id/assignee", authMiddleware, updateTicketAssignee);
router.delete("/:id", authMiddleware, deleteTicket);

router.get("/:id/comments", authMiddleware, getAllComments);
router.post("/:id/comments", authMiddleware, createComment);

router.get("/:id/messages", authMiddleware, getAllMessages);
router.post("/:id/messages", authMiddleware, createMessage);

router.get("/:id/history", authMiddleware, getTicketHistory);

module.exports = router;
