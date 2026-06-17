const AppDataSource = require("../config/data-source");

const FINAL_STATUSES = ["CLOSED", "CANCELLED"];

const getTicketRepository = () => {
  return AppDataSource.getRepository("Ticket");
};

const getCommentRepository = () => {
  return AppDataSource.getRepository("Comment");
};

const applyDateFilters = (query, filters) => {
  const { from, to } = filters;

  if (from) {
    query.andWhere("ticket.createdAt >= :from", {
      from: `${from} 00:00:00`,
    });
  }

  if (to) {
    query.andWhere("ticket.createdAt <= :to", {
      to: `${to} 23:59:59`,
    });
  }

  return query;
};

const countTickets = async (filters) => {
  const query = getTicketRepository().createQueryBuilder("ticket");

  applyDateFilters(query, filters);

  return await query.getCount();
};

const countTicketsByStatusValue = async (status, filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .where("ticket.status = :status", { status });

  applyDateFilters(query, filters);

  return await query.getCount();
};

const countTicketsByStatus = async (filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .select("ticket.status", "status")
    .addSelect("COUNT(ticket.id)", "count")
    .groupBy("ticket.status")
    .orderBy("ticket.status", "ASC");

  applyDateFilters(query, filters);

  const rows = await query.getRawMany();

  return rows.map((row) => ({
    status: row.status,
    count: Number(row.count),
  }));
};

const countTicketsByCategory = async (filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .select("ticket.category", "category")
    .addSelect("COUNT(ticket.id)", "count")
    .groupBy("ticket.category")
    .orderBy("ticket.category", "ASC");

  applyDateFilters(query, filters);

  const rows = await query.getRawMany();

  return rows.map((row) => ({
    category: row.category,
    count: Number(row.count),
  }));
};

const countTicketsBySubcategory = async (filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .select("ticket.subcategory", "subcategory")
    .addSelect("COUNT(ticket.id)", "count")
    .groupBy("ticket.subcategory")
    .orderBy("ticket.subcategory", "ASC");

  applyDateFilters(query, filters);

  const rows = await query.getRawMany();

  return rows.map((row) => ({
    subcategory: row.subcategory,
    count: Number(row.count),
  }));
};

const countTicketsByAssignee = async (filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .leftJoin("ticket.assignedTo", "assignedTo")
    .select("assignedTo.id", "assigneeId")
    .addSelect('assignedTo.firstName', 'firstName')
    .addSelect('assignedTo.lastName', 'lastName')
    .addSelect("COUNT(ticket.id)", "count")
    .groupBy("assignedTo.id")
    .addGroupBy("assignedTo.firstName")
    .addGroupBy("assignedTo.lastName")
    .orderBy("count", "DESC");

  applyDateFilters(query, filters);

  const rows = await query.getRawMany();

  return rows.map((row) => ({
    assignee: row.firstName ? `${row.firstName} ${row.lastName}` : "Sin asignar",
    count: Number(row.count),
  }));
};

const countTicketsCreatedByPeriod = async (filters) => {
  const { period } = filters;

  const dateTruncExpression = `DATE_TRUNC('${period}', ticket.createdAt)`;

  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .select(dateTruncExpression, "period")
    .addSelect("COUNT(ticket.id)", "count")
    .groupBy(dateTruncExpression)
    .orderBy("period", "ASC");

  applyDateFilters(query, filters);

  const rows = await query.getRawMany();

  return rows.map((row) => ({
    period: row.period,
    count: Number(row.count),
  }));
};

const getAverageResolutionTimeHours = async (filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .select(
      "AVG(EXTRACT(EPOCH FROM (ticket.closedAt - ticket.createdAt)) / 3600)",
      "averageHours",
    )
    .where("ticket.closedAt IS NOT NULL");

  applyDateFilters(query, filters);

  const row = await query.getRawOne();

  return row.averageHours !== null ? Number(row.averageHours) : null;
};

const countOldPendingTickets = async (days, filters) => {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - days);

  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .where("ticket.status NOT IN (:...finalStatuses)", {
      finalStatuses: FINAL_STATUSES,
    })
    .andWhere("ticket.createdAt <= :threshold", { threshold });

  applyDateFilters(query, filters);

  return await query.getCount();
};

const countComments = async (filters) => {
  const query = getCommentRepository()
    .createQueryBuilder("comment")
    .leftJoin("comment.ticket", "ticket");

  applyDateFilters(query, filters);

  return await query.getCount();
};

const getTopResolversByClosedTickets = async (filters) => {
  const query = getTicketRepository()
    .createQueryBuilder("ticket")
    .leftJoin("ticket.assignedTo", "assignedTo")
    .select("assignedTo.id", "assigneeId")
    .addSelect('assignedTo.firstName', 'firstName')
    .addSelect('assignedTo.lastName', 'lastName')
    .addSelect("COUNT(ticket.id)", "closedTickets")
    .where("ticket.status = :status", { status: "CLOSED" })
    .groupBy("assignedTo.id")
    .addGroupBy("assignedTo.firstName")
    .addGroupBy("assignedTo.lastName")
    .orderBy("COUNT(ticket.id)", "DESC")
    .limit(5);

  applyDateFilters(query, filters);

  const rows = await query.getRawMany();

  return rows.map((row) => ({
    responsible: row.firstName ? `${row.firstName} ${row.lastName}` : "Sin asignar",
    closedTickets: Number(row.closedTickets),
  }));
};

module.exports = {
  countTickets,
  countTicketsByStatusValue,
  countTicketsByStatus,
  countTicketsByCategory,
  countTicketsBySubcategory,
  countTicketsByAssignee,
  countTicketsCreatedByPeriod,
  getAverageResolutionTimeHours,
  countOldPendingTickets,
  countComments,
  getTopResolversByClosedTickets,
};