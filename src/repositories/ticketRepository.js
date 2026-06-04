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

const findById = async (id) => {
  return await getRepository().findOne({
    where: {
      id,
    },
    relations: {
      comments: true,
      messages: true,
      history: true,
    },
  });
};

const create = async (ticketData) => {
  const ticketRepository = getRepository();

  const ticket = ticketRepository.create({
    ...ticketData,
    createdBy: {
      id: userId,
    },
  });

  return await ticketRepository.save(ticket);
};

const updateStatus = async (id, updateData) => {
  const ticketRepository = getRepository();

  await ticketRepository.update(id, updateData);

  return await ticketRepository.findOne({
    where: { id },
  });
};

const deleteTicket = async (id) => {
  const ticketRepository = getRepository();

  await ticketRepository.delete(id);
};

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  deleteTicket,
};
