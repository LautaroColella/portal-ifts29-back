const authService = require("../../src/services/authService");

const userRepository = require("../../src/repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validators = require("../../src/validators/userValidator");
const idValidator = require("../../src/validators/idValidator");

describe("authService", () => {
  beforeEach(() => {
    spyOn(validators, "validateLogin").and.callFake((d) => d);
    spyOn(validators, "validateRegisterStudent").and.callFake((d) => d);
    spyOn(validators, "validateChangePassword").and.callFake((d) => d);

    spyOn(idValidator, "validateId").and.callFake((id) => id);

    spyOn(userRepository, "findByEmail");
    spyOn(userRepository, "findByDni");
    spyOn(userRepository, "create");
    spyOn(userRepository, "findById");
    spyOn(userRepository, "findByIdWithPassword");
    spyOn(userRepository, "updatePassword");

    spyOn(bcrypt, "compare");
    spyOn(bcrypt, "hash");

    spyOn(jwt, "sign");
  });

  it("should login and return token", async () => {
    userRepository.findByEmail.and.resolveTo({
      id: 1,
      role: "STUDENT",
      password: "hashedhashed",
    });

    bcrypt.compare.and.resolveTo(true);
    jwt.sign.and.returnValue("fake-token");

    const result = await authService.login({
      email: "test@test.com",
      password: "123123123",
    });

    expect(result.token).toBe("fake-token");

    expect(jwt.sign).toHaveBeenCalled();
  });

  it("should throw error when user does not exist", async () => {
    userRepository.findByEmail.and.resolveTo(null);

    try {
      await authService.login({
        email: "missing@test.com",
        password: "123123123",
      });

      fail("Expected error");
    } catch (err) {
      expect(err.message).toBe("Credenciales inválidas");
    }
  });

  it("should register a new user", async () => {
    userRepository.findByEmail.and.resolveTo(null);
    userRepository.findByDni.and.resolveTo(null);

    bcrypt.hash.and.resolveTo("hashed-password");

    userRepository.create.and.resolveTo({
      id: 10,
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      role: "STUDENT",
    });

    const result = await authService.register({
      email: "john@test.com",
      password: "123123123",
      dni: "12312312",
      firstName: "John",
      lastName: "Doe",
    });

    expect(result.id).toBe(10);
    expect(result.role).toBe("STUDENT");

    expect(bcrypt.hash).toHaveBeenCalled();
  });

  it("should throw error when current password is wrong", async () => {
    userRepository.findByIdWithPassword.and.resolveTo({
      id: 1,
      password: "hashedhashed",
    });

    bcrypt.compare.and.resolveTo(false);

    try {
      await authService.changePassword(1, {
        currentPassword: "wrongwrong",
        newPassword: "newnewnew",
      });

      fail("Expected error");
    } catch (err) {
      expect(err.message).toBe("La contraseña actual es incorrecta");
    }

    expect(userRepository.updatePassword).not.toHaveBeenCalled();
  });
});
