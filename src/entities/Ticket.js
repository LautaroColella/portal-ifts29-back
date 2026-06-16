const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Ticket",

  tableName: "tickets",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    title: {
      type: "varchar",
      nullable: false,
    },

    description: {
      type: "text",
      nullable: false,
    },

    status: {
      type: "enum",
      enum: [
        "OPEN",
        "IN_PROGRESS",
        "WAITING_FOR_STUDENT",
        "WAITING_FOR_THIRD_PARTY",
        "RESOLVED",
        "CLOSED",
        "CANCELLED",
      ],
      default: "OPEN",
    },

    category: {
      type: "enum",
      enum: ["ACADEMIC", "INSTITUTIONAL", "TECHNICAL", "GENERAL"],
      nullable: false,
    },

    subcategory: {
      type: "enum",
      enum: [
        // Academic
        "GRADE_ISSUE",
        "EXAM_ISSUE",
        "CORRELATIVITY_ISSUE",
        "SUBJECT_CONTENT_ISSUE",

        // Institutional
        "SUBJECT_EQUIVALENCY_REQUEST",
        "GRADE_RECORD_CORRECTION_REQUEST",
        "EXAM_CERTIFICATE_REQUEST",
        "DEGREE_PROCESS_REQUEST",
        "CLASS_SECTION_CHANGE_REQUEST",

        // Technical
        "MOODLE_PROBLEM",
        "SIU_PROBLEM",
        "WEBSITE_ERROR",

        // General
        "GENERAL_INQUIRY",
      ],
      nullable: false,
    },

    subject: {
      type: "varchar",
      nullable: true,
    },

    commission: {
      type: "varchar",
      nullable: true,
    },

    metadata: {
      type: "simple-json",
      nullable: true,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },

    resolvedAt: {
      type: "timestamp",
      nullable: true,
    },

    closedAt: {
      type: "timestamp",
      nullable: true,
    },
  },

  relations: {
    createdBy: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },

    assignedTo: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      nullable: true,
      onDelete: "SET NULL",
    },

    comments: {
      target: "Comment",
      type: "one-to-many",
      inverseSide: "ticket",
      cascade: true,
    },

    messages: {
      target: "Message",
      type: "one-to-many",
      inverseSide: "ticket",
      cascade: true,
    },

    history: {
      target: "TicketHistory",
      type: "one-to-many",
      inverseSide: "ticket",
      cascade: true,
    },

    notifications: {
      target: "Notification",
      type: "one-to-many",
      inverseSide: "ticket",
      cascade: true,
    },
  },
});
