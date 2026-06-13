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
const authorizeRoles = require("../middlewares/role");
const {
  authorizeTicketView,
  authorizeTicketAssignment,
  authorizeTicketStatusChange,
  authorizeTicketComment,
  authorizeTicketMessage,
  authorizeTicketDeletion,
} = require("../middlewares/ticketAuthorization");

const router = express.Router();

router.get("/", authMiddleware, getAllTickets);
router.get("/:id", authMiddleware, authorizeTicketView, getTicketById);
router.post("/", authMiddleware, authorizeRoles("STUDENT"), createTicket);
router.patch(
  "/:id/status",
  authMiddleware,
  authorizeTicketStatusChange,
  updateTicketStatus,
);
router.patch(
  "/:id/assignee",
  authMiddleware,
  authorizeTicketAssignment,
  updateTicketAssignee,
);
router.delete("/:id", authMiddleware, authorizeTicketDeletion, deleteTicket);

router.get(
  "/:id/comments",
  authMiddleware,
  authorizeTicketView,
  getAllComments,
);
router.post(
  "/:id/comments",
  authMiddleware,
  authorizeTicketComment,
  createComment,
);

router.get(
  "/:id/messages",
  authMiddleware,
  authorizeTicketView,
  getAllMessages,
);
router.post(
  "/:id/messages",
  authMiddleware,
  authorizeTicketMessage,
  createMessage,
);

router.get(
  "/:id/history",
  authMiddleware,
  authorizeTicketView,
  getTicketHistory,
);

module.exports = router;
