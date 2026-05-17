const dashboardRepository = require("../repositories/dashboardRepository");
const {
  validateDashboardFilters,
} = require("../validators/dashboardValidator");

const roundNumber = (value, decimals = 2) => {
  if (value === null || value === undefined) return null;

  return Number(value.toFixed(decimals));
};

const getDashboardMetrics = async ({ from, to, period }) => {
  const validatedFilters = validateDashboardFilters({
    from,
    to,
    period,
  });

  const [
    totalTickets,
    openTickets,
    closedTickets,
    inProgressTickets,
    ticketsByStatus,
    ticketsByCategory,
    ticketsBySubcategory,
    ticketsByAssignee,
    ticketsCreatedByPeriod,
    averageResolutionTimeHours,
    oldPendingTickets7Days,
    oldPendingTickets30Days,
    totalComments,
    topResolvers,
  ] = await Promise.all([
    dashboardRepository.countTickets(validatedFilters),
    dashboardRepository.countTicketsByStatusValue("OPEN", validatedFilters),
    dashboardRepository.countTicketsByStatusValue("CLOSED", validatedFilters),
    dashboardRepository.countTicketsByStatusValue(
      "IN_PROGRESS",
      validatedFilters,
    ),
    dashboardRepository.countTicketsByStatus(validatedFilters),
    dashboardRepository.countTicketsByCategory(validatedFilters),
    dashboardRepository.countTicketsBySubcategory(validatedFilters),
    dashboardRepository.countTicketsByAssignee(validatedFilters),
    dashboardRepository.countTicketsCreatedByPeriod(validatedFilters),
    dashboardRepository.getAverageResolutionTimeHours(validatedFilters),
    dashboardRepository.countOldPendingTickets(7, validatedFilters),
    dashboardRepository.countOldPendingTickets(30, validatedFilters),
    dashboardRepository.countComments(validatedFilters),
    dashboardRepository.getTopResolversByClosedTickets(validatedFilters),
  ]);

  const resolutionRate =
    totalTickets > 0 ? roundNumber((closedTickets / totalTickets) * 100) : 0;

  const averageCommentsPerTicket =
    totalTickets > 0 ? roundNumber(totalComments / totalTickets) : 0;

  return {
    totals: {
      totalTickets,
      openTickets,
      closedTickets,
      inProgressTickets,
    },

    ticketsCreatedByPeriod,
    ticketsByStatus,
    ticketsByCategory,
    ticketsBySubcategory,
    ticketsByAssignee,

    resolutionRate: {
      percentage: resolutionRate,
    },

    averageResolutionTime: {
      hours: roundNumber(averageResolutionTimeHours),
    },

    // TODO: Implement when TicketHistory stores status changes.
    // Expected logic: first timestamp where status changed to IN_PROGRESS minus ticket.createdAt.
    averageFirstManagementTime: {
      hours: null,
    },

    oldPendingTickets: {
      olderThan7Days: oldPendingTickets7Days,
      olderThan30Days: oldPendingTickets30Days,
    },

    averageCommentsPerTicket: {
      average: averageCommentsPerTicket,
    },

    // Expected values: STUDENT / STAFF.
    closedByActorType: [], 

    topResolvers,
  };
};

module.exports = {
  getDashboardMetrics,
};