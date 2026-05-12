const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Ticket");
};

const findAll = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [tickets, total] = await getRepository().findAndCount({
    order: {
      createdAt: "DESC",
    },

    skip,
    take: limit,
  });

  return {
    data: tickets,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

module.exports = {
  findAll,
};
