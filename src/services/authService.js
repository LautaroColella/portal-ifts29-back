const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");

const login = async ({ email, password }) => {
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

const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return user;
};

module.exports = {
  login,
  getCurrentUser,
};
