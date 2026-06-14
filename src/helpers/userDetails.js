const mapUserDetails = (user) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  dni: user.dni,
  email: user.email,
  role: user.role,
  staffType: user.staffType,
  responsibleSubcategories: user.responsibleSubcategories,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports = {
  mapUserDetails,
};
