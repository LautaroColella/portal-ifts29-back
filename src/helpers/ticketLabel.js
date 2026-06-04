const TICKET_STATUS_LABELS = {
  OPEN: "Abierto",
  IN_PROGRESS: "En progreso",
  WAITING_FOR_STUDENT: "Esperando al estudiante",
  WAITING_FOR_THIRD_PARTY: "Esperando a un tercero",
  RESOLVED: "Resuelto",
  CLOSED: "Cerrado",
  CANCELLED: "Cancelado",
};

const TICKET_CATEGORY_LABELS = {
  ACADEMIC: "Académico",
  INSTITUTIONAL: "Institucional",
  TECHNICAL: "Técnico",
  GENERAL: "General",
};

const TICKET_SUBCATEGORY_LABELS = {
  GRADE_ISSUE: "Problema con nota",
  EXAM_ISSUE: "Problema con examen",
  CORRELATIVITY_ISSUE: "Problema de correlatividades",
  SUBJECT_CONTENT_ISSUE: "Problema con contenido de materia",

  SUBJECT_EQUIVALENCY_REQUEST: "Solicitud de equivalencia",
  GRADE_RECORD_CORRECTION_REQUEST: "Solicitud de corrección de acta",
  EXAM_CERTIFICATE_REQUEST: "Solicitud de certificado de examen",
  DEGREE_PROCESS_REQUEST: "Solicitud de trámite de título",
  CLASS_SECTION_CHANGE_REQUEST: "Solicitud de cambio de comisión",

  MOODLE_PROBLEM: "Problema con Moodle",
  SIU_PROBLEM: "Problema con SIU",
  WEBSITE_ERROR: "Error en sitio web",

  GENERAL_INQUIRY: "Consulta general",
};

const TICKET_HISTORY_ACTION_LABELS = {
  TICKET_CREATED: "Ticket creado",
  STATUS_CHANGED: "Estado modificado",
  ASSIGNED_CHANGED: "Responsable modificado",
  COMMENT_ADDED: "Comentario agregado",
  MESSAGE_ADDED: "Mensaje agregado",
};

const addTicketLabels = (ticket) => ({
  ...ticket,

  statusLabel: TICKET_STATUS_LABELS[ticket.status],

  categoryLabel: TICKET_CATEGORY_LABELS[ticket.category],

  subcategoryLabel: TICKET_SUBCATEGORY_LABELS[ticket.subcategory],
});

const addHistoryLabels = (historyEntry) => {
  const result = {
    ...historyEntry,

    actionLabel: TICKET_HISTORY_ACTION_LABELS[historyEntry.action],
  };

  if (historyEntry.action === "STATUS_CHANGED") {
    result.oldValueLabel =
      TICKET_STATUS_LABELS[historyEntry.oldValue] ?? historyEntry.oldValue;

    result.newValueLabel =
      TICKET_STATUS_LABELS[historyEntry.newValue] ?? historyEntry.newValue;
  }

  return result;
};

module.exports = {
  addTicketLabels,
  addHistoryLabels,
  TICKET_STATUS_LABELS,
  TICKET_CATEGORY_LABELS,
  TICKET_SUBCATEGORY_LABELS,
  TICKET_HISTORY_ACTION_LABELS,
};
