const AppDataSource = require("../config/data-source");

const getRepository = () => AppDataSource.getRepository("User");

const create = async (userData) => {
  const repository = getRepository();

  const user = repository.create(userData);

  return await repository.save(user);
};

module.exports = {
  create,
};
