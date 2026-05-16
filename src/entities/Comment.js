// !PLACEHOLDER, NOT IMPLEMENTED
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Comment",

  tableName: "comments",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
  },

  relations: {
    ticket: {
      target: "Ticket",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
  },
});
