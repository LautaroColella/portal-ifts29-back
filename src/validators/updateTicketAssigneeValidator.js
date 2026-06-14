const ValidationError = require("../errors/ValidationError");

/**
 * Validates and sanitizes a ticket assignee.
 *
 * @param {string} assignee
 * The ticket assignee received from the request body.
 *
 * @returns {string}
 * Returns the validated ticket assignee.
 *
 * @throws {ValidationError}
 * Throws an error if validation fails.
 */
const validateTicketAssignee = (assigneeData) => {
  if (!assigneeData || typeof assigneeData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  const { assignedToId } = assigneeData;

  if (!assignedToId) {
    throw new ValidationError("El responsable es requerido");
  }

  const parsedId = Number(assignedToId);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new ValidationError("El responsable es inválido");
  }

  return parsedId;
};

module.exports = {
  validateTicketAssignee,
};
