const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

const { validateId } = require("../validators/idValidator");
const {
  validateLogin,
  validateChangePassword,
  validateRegisterStudent,
} = require("../validators/userValidator");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");

const login = async (loginData) => {
  const { email, password } = validateLogin(loginData);

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ValidationError("Credenciales inválidas");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new ValidationError("Credenciales inválidas");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "24h",
    },
  );

  return {
    token,
  };
};

const register = async (userData) => {
  const validatedUser = validateRegisterStudent(userData);

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

  const user = await userRepository.create({
    ...validatedUser,
    password: hashedPassword,
    role: "STUDENT",
    staffType: null,
    responsibleSubcategories: [],
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
};

const getCurrentUser = async (userId) => {
  const validatedId = validateId(userId);

  const user = await userRepository.findById(validatedId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return user;
};

const changePassword = async (userId, passwordData) => {
  const { currentPassword, newPassword } = validateChangePassword(passwordData);

  const user = await userRepository.findByIdWithPassword(userId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  const matches = await bcrypt.compare(currentPassword, user.password);

  if (!matches) {
    throw new ValidationError("La contraseña actual es incorrecta");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userRepository.updatePassword(userId, hashedPassword);
};

module.exports = {
  login,
  register,
  getCurrentUser,
  changePassword,
};
