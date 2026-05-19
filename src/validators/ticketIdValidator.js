/**
 * Validates and sanitizes a ticket ID.
 *
 * @param {string} id
 * The ticket ID received from route params.
 *
 * @returns {number}
 * Returns the sanitized numeric ticket ID.
 *
 * @throws {Error}
 * Throws an error if validation fails.
 */
const validateTicketId = (id) => {
  if (!id) {
    throw new Error("El identificador del ticket es requerido");
  }

  if (!/^\d+$/.test(id)) {
    throw new Error(
      "El identificador del ticket debe ser un número entero positivo",
    );
  }

  const parsedId = Number(id);

  if (!Number.isSafeInteger(parsedId)) {
    throw new Error("El identificador del ticket es demasiado grande");
  }

  if (parsedId <= 0) {
    throw new Error("El identificador del ticket debe ser mayor a 0");
  }

  return parsedId;
};

module.exports = {
  validateTicketId,
};
