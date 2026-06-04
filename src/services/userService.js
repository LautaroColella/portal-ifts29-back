const bcrypt = require("bcrypt");

const userRepository = require("../repositories/userRepository");

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await userRepository.create({
    ...userData,
    password: hashedPassword,
  });
};

module.exports = {
  createUser,
};
