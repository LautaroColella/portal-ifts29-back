const ValidationError = require("../errors/ValidationError");

const validateNotificationFilters = (filters) => {
  return {
    unreadOnly: filters.unreadOnly === "true",
  };
};

module.exports = {
  validateNotificationFilters,
};
