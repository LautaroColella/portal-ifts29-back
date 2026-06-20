//* a factory is 100% needed to make this scalable. Right now not so much.

const userRepository = require("../../src/repositories/userRepository");
const ticketRepository = require("../../src/repositories/ticketRepository");
const ticketHistoryRepository = require("../../src/repositories/ticketHistoryRepository");
const notificationService = require("../../src/services/notificationService");

const validators = require("../../src/validators/createTicketValidator");
const historyHelpers = require("../../src/helpers/ticketHistory");

const ticketService = require("../../src/services/ticketService");

function createTicketTestContext() {
  const spies = {};

  spies.validateCreateTicket = spyOn(
    validators,
    "validateCreateTicket",
  ).and.callFake((data) => data);

  spies.findResponsibleStaff = spyOn(
    userRepository,
    "findResponsibleStaff",
  ).and.resolveTo([
    { id: 1, firstName: "A", lastName: "One" },
    { id: 2, firstName: "B", lastName: "Two" },
  ]);

  spies.countAssignedActiveTickets = spyOn(
    ticketRepository,
    "countAssignedActiveTickets",
  ).and.callFake(async (id) => (id === 1 ? 5 : 2));

  spies.createTicket = spyOn(ticketRepository, "create").and.callFake(
    async (data, userId) => ({
      id: 100,
      title: data.title,
      createdBy: { id: userId },
      assignedTo: data.assignedTo,
    }),
  );

  spies.createHistoryEntry = spyOn(
    ticketHistoryRepository,
    "createHistoryEntry",
  ).and.resolveTo();

  spies.createNotification = spyOn(
    notificationService,
    "createNotification",
  ).and.resolveTo();

  spies.historyCreated = spyOn(
    historyHelpers,
    "createTicketCreatedHistory",
  ).and.returnValue({});

  spies.historyAssigned = spyOn(
    historyHelpers,
    "createAssignedChangedHistory",
  ).and.returnValue({});

  return {
    ticketService,
    spies,
  };
}

module.exports = createTicketTestContext;
