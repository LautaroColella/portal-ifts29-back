/**
 * Validates and sanitizes ticket filters.
 *
 * @param {Object} filters
 * @param {string} [filters.title]
 *
 * @returns {Object}
 * Returns sanitized filters.
 *
 * @throws {Error}
 * Throws an error if validation fails.
 */
const validateTicketFilters = (filters) => {
  const sanitizedFilters = {};

  if (filters.title !== undefined) {
    if (typeof filters.title !== "string") {
      throw new Error("El título debe ser un texto");
    }

    const sanitizedTitle = filters.title.trim();

    if (sanitizedTitle.length === 0) {
      throw new Error("El título no puede estar vacío");
    }

    if (sanitizedTitle.length > 100) {
      throw new Error("El título no puede superar 100 caracteres");
    }

    sanitizedFilters.title = sanitizedTitle;
  }

  return sanitizedFilters;
};

module.exports = {
  validateTicketFilters,
};
