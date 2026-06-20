const userService = require("../../src/services/userService");

const userRepository = require("../../src/repositories/userRepository");
const bcrypt = require("bcrypt");

const validators = require("../../src/validators/userValidator");
const idValidator = require("../../src/validators/idValidator");

describe("userService", () => {
  beforeEach(() => {
    spyOn(idValidator, "validateId").and.callFake((id) => id);

    spyOn(validators, "validateFirstName").and.callFake((v) => v);
    spyOn(validators, "validateLastName").and.callFake((v) => v);
    spyOn(validators, "validateDni").and.callFake((v) => v);
    spyOn(validators, "validateEmail").and.callFake((v) => v);
    spyOn(validators, "validatePassword").and.callFake((v) => v);
    spyOn(validators, "validateRole").and.callFake((v) => v);
    spyOn(validators, "validateStaffType").and.callFake((v) => v);
    spyOn(validators, "validateResponsibleSubcategories").and.callFake(
      (v) => v,
    );
    spyOn(validators, "validateUserConfiguration").and.callFake(() => {});
    spyOn(validators, "validateUpdateUserProfile").and.callFake((v) => v);
    spyOn(validators, "validateUpdateUserRole").and.callFake((v) => v);
    spyOn(validators, "validateUpdateUserStaffSettings").and.callFake((v) => v);

    spyOn(userRepository, "findById");
    spyOn(userRepository, "findByEmail");
    spyOn(userRepository, "findByDni");
    spyOn(userRepository, "create");
    spyOn(userRepository, "updateUser");
    spyOn(userRepository, "deleteUser");

    spyOn(bcrypt, "hash");
  });

  it("should return user by id", async () => {
    userRepository.findById.and.resolveTo({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
    });

    const result = await userService.getUserById(1);

    expect(result.id).toBe(1);
    expect(userRepository.findById).toHaveBeenCalledWith(1);
  });

  it("should throw error when user not found", async () => {
    userRepository.findById.and.resolveTo(null);

    try {
      await userService.getUserById(999);
      fail("Expected error");
    } catch (err) {
      expect(err.message).toBe("Usuario no encontrado");
    }
  });

  it("should create a user successfully", async () => {
    userRepository.findByEmail.and.resolveTo(null);
    userRepository.findByDni.and.resolveTo(null);

    bcrypt.hash.and.resolveTo("hashed-password");

    userRepository.create.and.resolveTo({
      id: 10,
      email: "test@test.com",
      firstName: "John",
      lastName: "Doe",
    });

    const result = await userService.createUser({
      firstName: "John",
      lastName: "Doe",
      dni: "12345678",
      email: "test@test.com",
      password: "12345678",
      role: "STUDENT",
      staffType: null,
      responsibleSubcategories: [],
    });

    expect(result.id).toBe(10);
    expect(bcrypt.hash).toHaveBeenCalled();
  });

  it("should throw error if email already exists", async () => {
    userRepository.findByEmail.and.resolveTo({ id: 1 });

    try {
      await userService.createUser({
        firstName: "John",
        lastName: "Doe",
        dni: "12345678",
        email: "test@test.com",
        password: "12345678",
        role: "STUDENT",
        staffType: null,
        responsibleSubcategories: [],
      });

      fail("Expected error");
    } catch (err) {
      expect(err.message).toBe("Ya existe un usuario con ese email");
    }
  });

  it("should update staff settings for STAFF user", async () => {
    userRepository.findById.and.resolveTo({
      id: 1,
      role: "STAFF",
    });

    userRepository.updateUser.and.resolveTo({
      id: 1,
      role: "STAFF",
    });

    const result = await userService.updateUserStaffSettings(1, {
      staffType: "TECH_SUPPORT",
      responsibleSubcategories: [
        "MOODLE_PROBLEM",
        "SIU_PROBLEM",
        "WEBSITE_ERROR",
      ],
    });

    expect(result.id).toBe(1);
    expect(userRepository.updateUser).toHaveBeenCalled();
  });

  it("should throw error when non-STAFF tries to update staff settings", async () => {
    userRepository.findById.and.resolveTo({
      id: 1,
      role: "STUDENT",
    });

    try {
      await userService.updateUserStaffSettings(1, {
        staffType: "SUPPORT",
        responsibleSubcategories: ["IT"],
      });

      fail("Expected error");
    } catch (err) {
      expect(err.message).toBe(
        "Solo los usuarios STAFF pueden tener configuración de personal",
      );
    }

    expect(userRepository.updateUser).not.toHaveBeenCalled();
  });
});
