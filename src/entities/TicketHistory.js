const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TicketHistory",

  tableName: "ticket_history",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    action: {
      type: "enum",
      enum: [
        "TICKET_CREATED",
        "STATUS_CHANGED",
        "ASSIGNED_CHANGED",
        "COMMENT_ADDED",
        "MESSAGE_ADDED",
      ],
      nullable: false,
    },

    oldValue: {
      type: "varchar",
      nullable: true,
    },

    newValue: {
      type: "varchar",
      nullable: true,
    },

    description: {
      type: "text",
      nullable: false,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    ticket: {
      target: "Ticket",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },

    // !PLACEHOLDER
    performedBy: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      nullable: true,
    },
  },
});
