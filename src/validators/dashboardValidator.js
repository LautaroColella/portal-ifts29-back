const VALID_PERIODS = ["day", "week", "month"];

const isValidDate = (value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const validateDashboardFilters = ({ from, to, period }) => {
  const sanitizedFilters = {
    period: "day",
  };

  if (period !== undefined) {
    if (typeof period !== "string") {
      throw new Error("Period must be a string");
    }

    const sanitizedPeriod = period.trim().toLowerCase();

    if (!VALID_PERIODS.includes(sanitizedPeriod)) {
      throw new Error("Period must be one of: day, week, month");
    }

    sanitizedFilters.period = sanitizedPeriod;
  }

  if (from !== undefined) {
    if (typeof from !== "string" || !isValidDate(from)) {
      throw new Error("From date must be a valid date");
    }

    sanitizedFilters.from = from;
  }

  if (to !== undefined) {
    if (typeof to !== "string" || !isValidDate(to)) {
      throw new Error("To date must be a valid date");
    }

    sanitizedFilters.to = to;
  }

  if (sanitizedFilters.from && sanitizedFilters.to) {
    const fromDate = new Date(sanitizedFilters.from);
    const toDate = new Date(sanitizedFilters.to);

    if (fromDate > toDate) {
      throw new Error("From date cannot be greater than to date");
    }
  }

  return sanitizedFilters;
};

module.exports = {
  validateDashboardFilters,
};