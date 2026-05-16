// !PLACEHOLDER, NOT IMPLEMENTED
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Message",

  tableName: "messages",

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
