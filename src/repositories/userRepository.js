const AppDataSource = require("../config/data-source");

const getRepository = () => AppDataSource.getRepository("User");

const findById = async (id) => {
  return await getRepository().findOne({
    where: {
      id,
    },

    select: {
      id: true,
      firstName: true,
      lastName: true,
      dni: true,
      email: true,
      role: true,
      staffType: true,
      responsibleSubcategories: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const findByEmail = async (email) => {
  return await getRepository().findOne({
    where: {
      email,
    },

    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });
};

const create = async (userData) => {
  const repository = getRepository();

  const user = repository.create(userData);

  return await repository.save(user);
};

module.exports = {
  create,
  findByEmail,
  findById,
};
