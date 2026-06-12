const AppDataSource = require("../config/data-source");

const getRepository = () => AppDataSource.getRepository("User");

const findAll = async ({ page, limit }) => {
  const repository = getRepository();

  const [items, total] = await repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,

    order: {
      lastName: "ASC",
    },
  });

  return {
    data: items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

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

const deleteUser = async (id) => {
  const repository = getRepository();

  await repository.delete(id);
};

module.exports = {
  findAll,
  create,
  findByEmail,
  findById,
  deleteUser,
};
