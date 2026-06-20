const createTicketTestContext = require("../factories/createTicketTestContext");

describe("createTicket service", () => {
  let ctx;

  beforeEach(() => {
    ctx = createTicketTestContext();
  });

  it("should assign ticket to staff with lowest workload and create notifications", async () => {
    const result = await ctx.ticketService.createTicket(
      {
        title: "No puedo acceder a Moodle",
        description: "El sistema me rechaza las credenciales.",
        category: "TECHNICAL",
        subcategory: "MOODLE_PROBLEM",
      },
      10,
    );

    expect(result.id).toBe(100);

    expect(ctx.spies.createTicket).toHaveBeenCalledWith(
      jasmine.objectContaining({
        assignedTo: { id: 2 },
      }),
      10,
    );

    expect(ctx.spies.createHistoryEntry).toHaveBeenCalledTimes(2);
    // ticket created and ticket assigned to

    expect(ctx.spies.createNotification).toHaveBeenCalledTimes(2);
    // ticket creator (student) and assigned to (staff)

    expect(ctx.spies.createNotification).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: "TICKET_CREATED",
        recipient: { id: 2 },
      }),
    );
    // notification type check

    expect(ctx.spies.createNotification).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: "TICKET_CREATED",
        recipient: { id: 10 },
      }),
    );

    expect(result.assignedTo).toEqual({ id: 2 });
    expect(result.createdBy).toEqual({ id: 10 });
  });

  it("should create ticket with no assigned staff when no candidates exist", async () => {
    ctx.spies.findResponsibleStaff.and.resolveTo([]);

    const result = await ctx.ticketService.createTicket(
      {
        title: "No staff available test",
        description: "Test",
        category: "TECHNICAL",
        subcategory: "MOODLE_PROBLEM",
      },
      10,
    );

    expect(result.assignedTo).toBeNull();

    expect(ctx.spies.createTicket).toHaveBeenCalledWith(
      jasmine.objectContaining({
        assignedTo: null,
      }),
      10,
    );

    expect(ctx.spies.createNotification).toHaveBeenCalledTimes(1);
    // only the creator should receive the notificacion

    expect(ctx.spies.createNotification).toHaveBeenCalledWith(
      jasmine.objectContaining({
        recipient: { id: 10 },
      }),
    );
  });

  it("should assign ticket to staff with lowest id when workloads are equal", async () => {
    ctx.spies.findResponsibleStaff.and.resolveTo([
      { id: 5, firstName: "A", lastName: "One" },
      { id: 2, firstName: "B", lastName: "Two" },
    ]);

    ctx.spies.countAssignedActiveTickets.and.resolveTo(3);

    const result = await ctx.ticketService.createTicket(
      {
        title: "Tie workload test",
        description: "Test",
        category: "TECHNICAL",
        subcategory: "MOODLE_PROBLEM",
      },
      10,
    );

    expect(ctx.spies.createTicket).toHaveBeenCalledWith(
      jasmine.objectContaining({
        assignedTo: { id: 2 },
      }),
      10,
    );

    expect(result.assignedTo).toEqual({ id: 2 });
  });

  it("should throw error when validation fails and not call repositories", async () => {
    ctx.spies.validateCreateTicket.and.throwError("Invalid ticket");

    try {
      await ctx.ticketService.createTicket(
        {
          title: "Bad ticket with no description",
          subcategory: "MOODLE_PROBLEM",
        },
        10,
      );

      fail("Expected error to be thrown");
    } catch (err) {
      expect(err.message).toBe("Descripción inválida");
    }

    expect(ctx.spies.findResponsibleStaff).not.toHaveBeenCalled();
    expect(ctx.spies.createTicket).not.toHaveBeenCalled();
    expect(ctx.spies.createNotification).not.toHaveBeenCalled();
  });
});
