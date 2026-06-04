const mapUserSummary = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};

module.exports = {
  mapUserSummary,
};
