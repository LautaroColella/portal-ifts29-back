const CATEGORY_SUBCATEGORY_MAP = {
  ACADEMIC: [
    "GRADE_ISSUE",
    "EXAM_ISSUE",
    "CORRELATIVITY_ISSUE",
    "SUBJECT_CONTENT_ISSUE",
  ],

  INSTITUTIONAL: [
    "SUBJECT_EQUIVALENCY_REQUEST",
    "GRADE_RECORD_CORRECTION_REQUEST",
    "NEW_STUDENT_CERTIFICATE_REQUEST",
    "EXAM_CERTIFICATE_REQUEST",
    "DEGREE_PROCESS_REQUEST",
    "CLASS_SECTION_CHANGE_REQUEST",
  ],

  TECHNICAL: ["MOODLE_PROBLEM", "SIU_PROBLEM", "WEBSITE_ERROR"],

  GENERAL: ["GENERAL_INQUIRY"],
};

/**
 * Validates and sanitizes ticket creation data.
 *
 * @param {Object} ticketData
 * @param {string} ticketData.title
 * @param {string} ticketData.description
 * @param {string} ticketData.category
 * @param {string} ticketData.subcategory
 * @param {string} [ticketData.subject]
 * @param {string} [ticketData.commission]
 * @param {Object} [ticketData.metadata]
 *
 * @returns {Object}
 * Returns sanitized ticket creation data.
 *
 * @throws {Error}
 * Throws an error if validation fails.
 */
const validateCreateTicket = (ticketData) => {
  if (!ticketData || typeof ticketData !== "object") {
    throw new Error("El cuerpo de la petición es inválido");
  }

  const {
    title,
    description,
    category,
    subcategory,
    subject,
    commission,
    metadata,
  } = ticketData;

  if (!title || typeof title !== "string") {
    throw new Error("Título inválido");
  }

  if (!description || typeof description !== "string") {
    throw new Error("Descripción inválida");
  }

  if (!category || !CATEGORY_SUBCATEGORY_MAP[category]) {
    throw new Error("Categoría inválida");
  }

  if (
    !subcategory ||
    !CATEGORY_SUBCATEGORY_MAP[category].includes(subcategory)
  ) {
    throw new Error("La subcategoría no pertenece a la categoría seleccionada");
  }

  if (subject && typeof subject !== "string") {
    throw new Error("Materia inválida");
  }

  if (commission && typeof commission !== "string") {
    throw new Error("Comisión inválida");
  }

  if (metadata && typeof metadata !== "object") {
    throw new Error("Metadata inválida");
  }

  return {
    title: title.trim(),
    description: description.trim(),
    category,
    subcategory,
    subject: subject || null,
    commission: commission || null,
    metadata: metadata || null,
  };
};

module.exports = {
  validateCreateTicket,
};
