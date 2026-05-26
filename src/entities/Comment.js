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

    content: {
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

    author: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      nullable: true, //! PLACEHOLDER
    },
  },
});
