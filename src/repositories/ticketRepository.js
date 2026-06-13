const AppDataSource = require("../config/data-source");

const getRepository = () => {
  return AppDataSource.getRepository("Ticket");
};

const findAll = async (filters) => {
  const { page, limit, title, currentUser } = filters;

  const skip = (page - 1) * limit;

  const query = getRepository()
    .createQueryBuilder("ticket")
    .leftJoinAndSelect("ticket.createdBy", "createdBy")
    .leftJoinAndSelect("ticket.assignedTo", "assignedTo");

  if (title) {
    query.andWhere("LOWER(ticket.title) LIKE LOWER(:title)", {
      title: `%${title}%`,
    });
  }

  switch (currentUser.role) {
    case "STUDENT":
      query.andWhere("createdBy.id = :userId", {
        userId: currentUser.id,
      });
      break;

    case "STAFF": {
      const subcategories = currentUser.responsibleSubcategories ?? [];

      if (subcategories.length > 0) {
        query.andWhere(
          `(
            assignedTo.id = :userId
            OR
            ticket.subcategory IN (:...subcategories)
          )`,
          {
            userId: currentUser.id,
            subcategories,
          },
        );
      } else {
        query.andWhere("assignedTo.id = :userId", {
          userId: currentUser.id,
        });
      }

      break;
    }

    case "MANAGEMENT":
    case "ADMIN":
      break;

    default:
      query.andWhere("1 = 0");
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
      createdBy: true,
      assignedTo: true,
      comments: {
        author: true,
      },

      messages: {
        author: true,
      },

      history: {
        performedBy: true,
      },
    },
  });
};

const create = async (ticketData, userId) => {
  const ticketRepository = getRepository();

  const ticket = ticketRepository.create({
    ...ticketData,
    createdBy: {
      id: userId,
    },
  });

  return await ticketRepository.save(ticket);
};

const updateStatus = async (ticketId, updateData) => {
  const ticketRepository = getRepository();

  await ticketRepository.update(ticketId, updateData);

  return await findById(ticketId);
};

const updateAssignee = async (ticketId, assignedToId) => {
  const repository = getRepository();

  await repository.update(ticketId, {
    assignedTo: {
      id: assignedToId,
    },
  });

  return await findById(ticketId);
};

const deleteTicket = async (id) => {
  const ticketRepository = getRepository();

  await ticketRepository.delete(id);
};

const countAssignedActiveTickets = async (staffId) => {
  return await getRepository()
    .createQueryBuilder("ticket")
    .where("ticket.assignedToId = :staffId", {
      staffId,
    })
    .andWhere("ticket.status IN (:...statuses)", {
      statuses: [
        "OPEN",
        "IN_PROGRESS",
        "WAITING_FOR_STUDENT",
        "WAITING_FOR_THIRD_PARTY",
      ],
    })
    .getCount();
};

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  updateAssignee,
  deleteTicket,
  countAssignedActiveTickets,
};
