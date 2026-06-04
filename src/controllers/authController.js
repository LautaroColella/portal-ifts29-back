const authService = require("../services/authService");

const asyncHandler = require("../helpers/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return res.status(200).json(result);
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return res.status(200).json(user);
});

module.exports = {
  login,
  me,
};
