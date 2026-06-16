const ForbiddenError = require("../errors/ForbiddenError");

const authorizeSelfOrAdmin = (req, res, next) => {
  const targetUserId = Number(req.params.id);

  if (req.user.role === "ADMIN" || req.user.id === targetUserId) {
    return next();
  }

  return next(new ForbiddenError());
};

module.exports = {
  authorizeSelfOrAdmin,
};
