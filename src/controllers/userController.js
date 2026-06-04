const userService = require("../services/userService");

const asyncHandler = require("../helpers/asyncHandler");

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(201).json(user);
});

module.exports = {
  createUser,
};
