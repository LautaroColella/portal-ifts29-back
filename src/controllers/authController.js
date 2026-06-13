const authService = require("../services/authService");

const asyncHandler = require("../helpers/asyncHandler");

const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return res.status(200).json(user);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return res.status(200).json(result);
});

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return res.status(201).json(result);
});

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  await authService.changePassword(userId, req.body);

  return res.sendStatus(204);
});

module.exports = {
  me,
  login,
  register,
  changePassword,
};
