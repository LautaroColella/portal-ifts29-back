const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",

  tableName: "users",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    firstName: {
      type: "varchar",
      nullable: false,
    },

    lastName: {
      type: "varchar",
      nullable: false,
    },

    dni: {
      type: "varchar",
      unique: true,
      nullable: false,
    },

    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },

    password: {
      type: "varchar",
      nullable: false,
      select: false,
    },

    role: {
      type: "enum",
      enum: ["STUDENT", "STAFF", "MANAGEMENT", "ADMIN"],
      nullable: false,
    },

    staffType: {
      type: "enum",
      enum: ["TUTOR", "BEDEL", "TECH_SUPPORT", "COORDINATOR"],
      nullable: true,
    },

    responsibleSubcategories: {
      type: "simple-array",
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
  },

  relations: {
    createdTickets: {
      target: "Ticket",
      type: "one-to-many",
      inverseSide: "createdBy",
    },

    assignedTickets: {
      target: "Ticket",
      type: "one-to-many",
      inverseSide: "assignedTo",
    },

    comments: {
      target: "Comment",
      type: "one-to-many",
      inverseSide: "author",
    },

    messages: {
      target: "Message",
      type: "one-to-many",
      inverseSide: "author",
    },

    historyEntries: {
      target: "TicketHistory",
      type: "one-to-many",
      inverseSide: "performedBy",
    },
  },
});
