const AppError = require("./AppError");

class ForbiddenError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
