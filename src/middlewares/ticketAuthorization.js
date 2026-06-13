const ticketRepository = require("../repositories/ticketRepository");

const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const { validateId } = require("../validators/idValidator");
const {
  validateTicketStatus,
} = require("../validators/updateTicketStatusValidator");

const {
  canViewTicket,
  canAssignTicket,
  canChangeTicketStatus,
  canCommentTicket,
  canMessageTicket,
  canDeleteTicket,
} = require("../helpers/ticketPermissions");

const getTicketOrThrow = async (ticketId) => {
  const validatedId = validateId(ticketId);

  const ticket = await ticketRepository.findById(validatedId);

  if (!ticket) {
    throw new NotFoundError("Ticket no encontrado");
  }

  return ticket;
};

const authorizeTicketView = async (req, res, next) => {
  try {
    const ticket = await getTicketOrThrow(req.params.id);

    if (!canViewTicket(req.user, ticket)) {
      return next(new ForbiddenError());
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeTicketAssignment = async (req, res, next) => {
  try {
    const ticket = await getTicketOrThrow(req.params.id);

    if (!canAssignTicket(req.user, ticket)) {
      return next(new ForbiddenError());
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeTicketStatusChange = async (req, res, next) => {
  try {
    const ticket = await getTicketOrThrow(req.params.id);

    const validatedStatus = validateTicketStatus(req.body);

    if (!canChangeTicketStatus(req.user, ticket, validatedStatus)) {
      return next(new ForbiddenError());
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeTicketComment = async (req, res, next) => {
  try {
    const ticket = await getTicketOrThrow(req.params.id);

    if (!canCommentTicket(req.user, ticket)) {
      return next(new ForbiddenError());
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeTicketMessage = async (req, res, next) => {
  try {
    const ticket = await getTicketOrThrow(req.params.id);

    if (!canMessageTicket(req.user, ticket)) {
      return next(new ForbiddenError());
    }

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeTicketDeletion = async (req, res, next) => {
  try {
    const ticket = await getTicketOrThrow(req.params.id);

    if (!canDeleteTicket(req.user, ticket)) {
      return next(new ForbiddenError());
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeTicketView,
  authorizeTicketAssignment,
  authorizeTicketStatusChange,
  authorizeTicketComment,
  authorizeTicketMessage,
  authorizeTicketDeletion,
};
