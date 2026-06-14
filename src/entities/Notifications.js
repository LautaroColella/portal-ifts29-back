const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Notification",

  tableName: "notifications",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    message: {
      type: "varchar",
      nullable: false,
    },

    type: {
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

    read: {
      type: "boolean",
      default: false,
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

    recipient: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      nullable: true,
    },
  },
});
