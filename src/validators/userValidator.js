const ValidationError = require("../errors/ValidationError");

const USER_ROLES = ["STUDENT", "STAFF", "MANAGEMENT", "ADMIN"];

const STAFF_TYPES = ["TUTOR", "BEDEL", "TECH_SUPPORT", "COORDINATOR"];

const TICKET_SUBCATEGORIES = [
  "GRADE_ISSUE",
  "EXAM_ISSUE",
  "CORRELATIVITY_ISSUE",
  "SUBJECT_CONTENT_ISSUE",

  "SUBJECT_EQUIVALENCY_REQUEST",
  "GRADE_RECORD_CORRECTION_REQUEST",
  "EXAM_CERTIFICATE_REQUEST",
  "DEGREE_PROCESS_REQUEST",
  "CLASS_SECTION_CHANGE_REQUEST",

  "MOODLE_PROBLEM",
  "SIU_PROBLEM",
  "WEBSITE_ERROR",

  "GENERAL_INQUIRY",
];

const validateFirstName = (firstName) => {
  if (!firstName || typeof firstName !== "string") {
    throw new ValidationError("El nombre es requerido");
  }

  const sanitizedFirstName = firstName.trim();

  if (!sanitizedFirstName) {
    throw new ValidationError("El nombre es inválido");
  }

  if (sanitizedFirstName.length < 2) {
    throw new ValidationError("El nombre debe tener al menos 2 caracteres");
  }

  if (sanitizedFirstName.length > 100) {
    throw new ValidationError("El nombre no puede superar los 100 caracteres");
  }

  return sanitizedFirstName;
};

const validateLastName = (lastName) => {
  if (!lastName || typeof lastName !== "string") {
    throw new ValidationError("El apellido es requerido");
  }

  const sanitizedLastName = lastName.trim();

  if (!sanitizedLastName) {
    throw new ValidationError("El apellido es inválido");
  }

  if (sanitizedLastName.length < 2) {
    throw new ValidationError("El apellido debe tener al menos 2 caracteres");
  }

  if (sanitizedLastName.length > 100) {
    throw new ValidationError(
      "El apellido no puede superar los 100 caracteres",
    );
  }

  return sanitizedLastName;
};

const validateDni = (dni) => {
  if (!dni || typeof dni !== "string") {
    throw new ValidationError("El DNI es requerido");
  }

  const sanitizedDni = dni.trim();

  if (!/^\d+$/.test(sanitizedDni)) {
    throw new ValidationError("El DNI debe contener solo números");
  }

  if (sanitizedDni.length < 7 || sanitizedDni.length > 8) {
    throw new ValidationError("El DNI debe tener entre 7 y 8 dígitos");
  }

  return sanitizedDni;
};

const validateEmail = (email) => {
  if (!email || typeof email !== "string") {
    throw new ValidationError("El email es requerido");
  }

  const sanitizedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitizedEmail)) {
    throw new ValidationError("El email es inválido");
  }

  if (sanitizedEmail.length > 255) {
    throw new ValidationError("El email no puede superar los 255 caracteres");
  }

  return sanitizedEmail;
};

const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    throw new ValidationError("La contraseña es requerida");
  }

  const sanitizedPassword = password.trim();

  if (sanitizedPassword.length < 8) {
    throw new ValidationError("La contraseña debe tener al menos 8 caracteres");
  }

  if (sanitizedPassword.length > 100) {
    throw new ValidationError(
      "La contraseña no puede superar los 100 caracteres",
    );
  }

  return sanitizedPassword;
};

const validateRole = (role) => {
  if (!role || typeof role !== "string") {
    throw new ValidationError("El rol es requerido");
  }

  if (!USER_ROLES.includes(role)) {
    throw new ValidationError("El rol es inválido");
  }

  return role;
};

const validateStaffType = (staffType) => {
  if (!staffType) {
    return null;
  }

  if (!STAFF_TYPES.includes(staffType)) {
    throw new ValidationError("El tipo de personal es inválido");
  }

  return staffType;
};

const validateResponsibleSubcategories = (responsibleSubcategories) => {
  if (!responsibleSubcategories) {
    return [];
  }

  if (!Array.isArray(responsibleSubcategories)) {
    throw new ValidationError("Las subcategorías deben ser un arreglo");
  }

  responsibleSubcategories.forEach((subcategory) => {
    if (!TICKET_SUBCATEGORIES.includes(subcategory)) {
      throw new ValidationError(`La subcategoría '${subcategory}' es inválida`);
    }
  });

  return responsibleSubcategories;
};

const validateUserConfiguration = ({
  role,
  staffType,
  responsibleSubcategories,
}) => {
  if (role === "STAFF") {
    if (!staffType) {
      throw new ValidationError(
        "Los usuarios STAFF deben pertenecer a un tipo de personal",
      );
    }

    return;
  }

  if (staffType) {
    throw new ValidationError(
      "Solo los usuarios STAFF pueden tener un tipo de personal",
    );
  }

  if (responsibleSubcategories && responsibleSubcategories.length > 0) {
    throw new ValidationError(
      "Solo los usuarios STAFF pueden tener subcategorías asignadas",
    );
  }
};

const validateLogin = (loginData) => {
  if (!loginData || typeof loginData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  return {
    email: validateEmail(loginData.email),
    password: validatePassword(loginData.password),
  };
};

const validateChangePassword = (passwordData) => {
  if (!passwordData || typeof passwordData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  const currentPassword = validatePassword(passwordData.currentPassword);
  const newPassword = validatePassword(passwordData.newPassword);

  if (currentPassword === newPassword) {
    throw new ValidationError(
      "La nueva contraseña debe ser distinta a la actual",
    );
  }

  return {
    currentPassword,
    newPassword,
  };
};

const validateUpdateUserProfile = (profileData) => {
  if (!profileData || typeof profileData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  const updateData = {};

  if (profileData.firstName !== undefined) {
    updateData.firstName = validateFirstName(profileData.firstName);
  }

  if (profileData.lastName !== undefined) {
    updateData.lastName = validateLastName(profileData.lastName);
  }

  if (profileData.email !== undefined) {
    updateData.email = validateEmail(profileData.email);
  }

  if (Object.keys(updateData).length === 0) {
    throw new ValidationError("Debe enviar al menos un campo para actualizar");
  }

  return updateData;
};

const validateUpdateUserRole = (roleData) => {
  if (!roleData || typeof roleData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  return {
    role: validateRole(roleData.role),
  };
};

const validateUpdateUserStaffSettings = (settingsData) => {
  if (!settingsData || typeof settingsData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  return {
    staffType: validateStaffType(settingsData.staffType),

    responsibleSubcategories: validateResponsibleSubcategories(
      settingsData.responsibleSubcategories,
    ),
  };
};

const validateRegisterStudent = (userData) => {
  if (!userData || typeof userData !== "object") {
    throw new ValidationError("El cuerpo de la petición es inválido");
  }

  return {
    firstName: validateFirstName(userData.firstName),
    lastName: validateLastName(userData.lastName),
    dni: validateDni(userData.dni),
    email: validateEmail(userData.email),
    password: validatePassword(userData.password),
  };
};

module.exports = {
  validateFirstName,
  validateLastName,
  validateDni,
  validateEmail,
  validatePassword,
  validateRole,
  validateStaffType,
  validateResponsibleSubcategories,
  validateUserConfiguration,
  validateLogin,
  validateChangePassword,
  validateUpdateUserProfile,
  validateUpdateUserRole,
  validateUpdateUserStaffSettings,
  validateRegisterStudent,
};
