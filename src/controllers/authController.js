const authService = require("../services/authService");

const asyncHandler = require("../helpers/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return res.status(200).json(result);
});

module.exports = {
  login,
};
