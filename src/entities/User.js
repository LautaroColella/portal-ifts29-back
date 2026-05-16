// !PLACEHOLDER, NOT IMPLEMENTED
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
  },
});
