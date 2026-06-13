const userService = require("../services/userService");

const asyncHandler = require("../helpers/asyncHandler");

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const users = await userService.getAllUsers({ page, limit });

  return res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  return res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(201).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedUser = await userService.updateUserProfile(id, req.body);

  return res.status(200).json(updatedUser);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedUser = await userService.updateUserRole(id, req.body);

  return res.status(200).json(updatedUser);
});

const updateUserStaffSettings = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedUser = await userService.updateUserStaffSettings(id, req.body);

  return res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id, req.user.id);

  return res.status(204).send();
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserRole,
  updateUserStaffSettings,
  deleteUser,
};
