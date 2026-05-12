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
      nullable: true,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});
