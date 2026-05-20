const ValidationError = require("../errors/ValidationError");

const MAX_LIMIT = 50;

/**
 * Validates pagination query parameters.
 *
 * Ensures that:
 * - page is a positive integer
 * - limit is a positive integer
 * - limit does not exceed the maximum allowed value
 *
 * @param {number|string} page - Requested page number.
 * @param {number|string} limit - Requested number of items per page.
 *
 * @returns {{ page: number, limit: number }}
 * Returns validated and normalized pagination values.
 *
 * @throws {Error}
 * Throws an error if validation fails.
 */
const validatePagination = (page, limit) => {
  page = Number(page);
  limit = Number(limit);

  if (!Number.isInteger(page) || page < 1) {
    throw new ValidationError(
      "El número de página debe ser un entero positivo",
    );
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new ValidationError(
      "La cantidad de elementos a devolver debe ser un entero positivo",
    );
  }

  if (limit > MAX_LIMIT) {
    throw new ValidationError(
      `La cantidad de elementos a devolver no puede ser mayor que ${MAX_LIMIT}`,
    );
  }

  return {
    page,
    limit,
  };
};

module.exports = {
  validatePagination,
};
