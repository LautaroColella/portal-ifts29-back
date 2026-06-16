const canViewTicket = (user, ticket) => {
  switch (user.role) {
    case "ADMIN":
    case "MANAGEMENT":
      return true;

    case "STUDENT":
      return ticket.createdBy?.id === user.id;

    case "STAFF":
      return (
        ticket.assignedTo?.id === user.id ||
        user.responsibleSubcategories?.includes(ticket.subcategory)
      );

    default:
      return false;
  }
};

const canCreateTicket = (user) => {
  return user.role === "STUDENT";
};

const canAssignTicket = (user, ticket) => {
  return user.role === "STAFF" && canViewTicket(user, ticket);
};

const canChangeTicketStatus = (user, ticket, newStatus) => {
  if (user.role === "STAFF" && ticket.assignedTo?.id === user.id) {
    return true;
  }

  if (
    user.role === "STUDENT" &&
    ticket.createdBy?.id === user.id &&
    ticket.status === "OPEN" &&
    newStatus === "CANCELLED"
  ) {
    return true;
  }

  return false;
};

const canCommentTicket = (user, ticket) => {
  return user.role === "STUDENT" && ticket.createdBy?.id === user.id;
};

const canMessageTicket = (user, ticket) => {
  return user.role === "STAFF" && ticket.assignedTo?.id === user.id;
};

const canDeleteTicket = (user, ticket) => {
  return user.role === "STAFF" && canViewTicket(user, ticket);
};

module.exports = {
  canViewTicket,
  canCreateTicket,
  canAssignTicket,
  canChangeTicketStatus,
  canCommentTicket,
  canMessageTicket,
  canDeleteTicket,
};
