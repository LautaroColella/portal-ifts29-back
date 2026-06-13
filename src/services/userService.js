const bcrypt = require("bcrypt");

const userRepository = require("../repositories/userRepository");

const { validatePagination } = require("../validators/paginationValidator");
const { validateId } = require("../validators/idValidator");
const {
  validateFirstName,
  validateLastName,
  validateDni,
  validateEmail,
  validatePassword,
  validateRole,
  validateStaffType,
  validateResponsibleSubcategories,
  validateUserConfiguration,
  validateUpdateUserProfile,
  validateUpdateUserRole,
  validateUpdateUserStaffSettings,
} = require("../validators/userValidator");

const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
const ForbiddenError = require("../errors/ForbiddenError");

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
  const validatedUser = {
    firstName: validateFirstName(userData.firstName),
    lastName: validateLastName(userData.lastName),
    dni: validateDni(userData.dni),
    email: validateEmail(userData.email),
    password: validatePassword(userData.password),
    role: validateRole(userData.role),
    staffType: validateStaffType(userData.staffType),
    responsibleSubcategories: validateResponsibleSubcategories(
      userData.responsibleSubcategories,
    ),
  };

  validateUserConfiguration(validatedUser);

  const existingUserByEmail = await userRepository.findByEmail(
    validatedUser.email,
  );

  if (existingUserByEmail) {
    throw new ValidationError("Ya existe un usuario con ese email");
  }

  const existingUserByDni = await userRepository.findByDni(validatedUser.dni);

  if (existingUserByDni) {
    throw new ValidationError("Ya existe un usuario con ese DNI");
  }

  const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

  return await userRepository.create({
    ...validatedUser,
    password: hashedPassword,
  });
};

const updateUserProfile = async (id, profileData) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const validatedProfile = validateUpdateUserProfile(profileData);

  if (validatedProfile.email) {
    const existingUser = await userRepository.findByEmail(
      validatedProfile.email,
    );

    if (existingUser && existingUser.id !== validatedId) {
      throw new ValidationError("Ya existe un usuario con ese email");
    }
  }

  const updatedUser = await userRepository.updateUser(
    validatedId,
    validatedProfile,
  );

  return mapUserDetails(updatedUser);
};

const updateUserRole = async (id, roleData) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const validatedRole = validateUpdateUserRole(roleData);

  const updatedUser = await userRepository.updateUser(
    validatedId,
    validatedRole,
  );

  return mapUserDetails(updatedUser);
};

const updateUserStaffSettings = async (id, settingsData) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  if (user.role !== "STAFF") {
    throw new ValidationError(
      "Solo los usuarios STAFF pueden tener configuración de personal",
    );
  }

  const validatedSettings = validateUpdateUserStaffSettings(settingsData);

  validateUserConfiguration({
    role: user.role,
    ...validatedSettings,
  });

  const updatedUser = await userRepository.updateUser(
    validatedId,
    validatedSettings,
  );

  return mapUserDetails(updatedUser);
};

const deleteUser = async (id, performedById) => {
  const validatedId = validateId(id);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  if (validatedId === performedById) {
    throw new ForbiddenError("No puede eliminar su propio usuario");
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
