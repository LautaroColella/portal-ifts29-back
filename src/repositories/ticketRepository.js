const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Ticket");
};

const findAll = async () => {
  return await getRepository().find();
};

module.exports = {
  findAll,
};
