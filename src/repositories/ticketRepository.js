const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Ticket");
};

const findAll = async (filters) => {
  const { page, limit, title } = filters;

  const skip = (page - 1) * limit;

  const query = getRepository().createQueryBuilder("ticket");

  if (title) {
    query.andWhere("LOWER(ticket.title) LIKE LOWER(:title)", {
      title: `%${title}%`,
    });
  }

  query.orderBy("ticket.createdAt", "DESC").skip(skip).take(limit);

  const [tickets, total] = await query.getManyAndCount();

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
