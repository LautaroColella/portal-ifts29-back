const ForbiddenError = require("../errors/ForbiddenError");

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError());
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }

    next();
  };
};

module.exports = authorizeRoles;
