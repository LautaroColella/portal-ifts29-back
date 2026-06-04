const ValidationError = require("../errors/ValidationError");

/**
 * Validates and sanitizes comment creation data.
 *
 * @param {Object} commentData
 * @param {string} commentData.content
 *
 * @returns {Object}
 * Returns sanitized comment creation data.
 *
 * @throws {ValidationError}
 * Throws an error if validation fails.
 */
const validateCreateComment = (commentData) => {
  if (!commentData || typeof commentData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  const { content } = commentData;

  if (!content || typeof content !== "string") {
    throw new ValidationError("El contenido del comentario es requerido");
  }

  const sanitizedContent = content.trim();

  if (!sanitizedContent) {
    throw new ValidationError("El contenido del comentario es inválido");
  }

  if (sanitizedContent.length > 100) {
    throw new ValidationError(
      "El contenido del comentario no puede superar los 100 caracteres",
    );
  }

  return {
    content: sanitizedContent,
  };
};

module.exports = {
  validateCreateComment,
};
