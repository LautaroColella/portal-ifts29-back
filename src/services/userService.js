const bcrypt = require("bcrypt");

const userRepository = require("../repositories/userRepository");

const { validatePagination } = require("../validators/paginationValidator");
const { validateId } = require("../validators/idValidator");

const NotFoundError = require("../errors/NotFoundError");

const { mapUserDetails } = require("../helpers/userDetails");

const getAllUsers = async ({ page, limit }) => {
  const validatedPagination = validatePagination(page, limit);

  const result = await userRepository.findAll({
    ...validatedPagination,
  });

  result.data = result.data.map(mapUserDetails);

  return result;
};

const getUserById = async (id) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return mapUserDetails(user);
};

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await userRepository.create({
    ...userData,
    password: hashedPassword,
  });
};

const updateUserProfile = async (id, profileData) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const updatedUser = await userRepository.updateUser(validatedId, profileData);

  return mapUserDetails(updatedUser);
};

const updateUserRole = async (id, roleData) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const updatedUser = await userRepository.updateUser(validatedId, {
    role: roleData.role,
  });

  return mapUserDetails(updatedUser);
};

const updateUserStaffSettings = async (id, settingsData) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const updatedUser = await userRepository.updateUser(validatedId, {
    staffType: settingsData.staffType,
    responsibleSubcategories: settingsData.responsibleSubcategories,
  });

  return mapUserDetails(updatedUser);
};

const deleteUser = async (id) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  await userRepository.deleteUser(validatedId);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserRole,
  updateUserStaffSettings,
  deleteUser,
};
