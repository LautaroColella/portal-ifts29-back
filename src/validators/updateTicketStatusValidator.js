const ValidationError = require("../errors/ValidationError");

const VALID_TICKET_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "WAITING_FOR_STUDENT",
  "WAITING_FOR_THIRD_PARTY",
  "RESOLVED",
  "CLOSED",
  "CANCELLED",
];

/**
 * Validates and sanitizes a ticket status.
 *
 * @param {string} status
 * The ticket status received from the request body.
 *
 * @returns {string}
 * Returns the validated ticket status.
 *
 * @throws {ValidationError}
 * Throws an error if validation fails.
 */
const validateTicketStatus = (statusData) => {
  if (!statusData || typeof statusData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  const { status } = statusData;

  if (!status || typeof status !== "string") {
    throw new ValidationError("El estado del ticket es requerido");
  }

  const sanitizedStatus = status.trim().toUpperCase();

  if (!VALID_TICKET_STATUSES.includes(sanitizedStatus)) {
    throw new ValidationError("El estado del ticket es inválido");
  }

  return sanitizedStatus;
};

module.exports = {
  validateTicketStatus,
};
