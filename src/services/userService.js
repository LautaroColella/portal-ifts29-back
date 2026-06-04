const userRepository = require("../repositories/userRepository");

const createUser = async (userData) => {
  return await userRepository.create(userData);
};

module.exports = {
  createUser,
};
