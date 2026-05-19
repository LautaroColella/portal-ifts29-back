const AppError = require("../errors/AppError");

const errorHandler = (err, req, res, next) => {
  // Known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Unexpected/internal errors
  // !Use logger later
  console.error(err);

  return res.status(500).json({
    error: "Error interno del servidor",
  });
};

module.exports = errorHandler;
