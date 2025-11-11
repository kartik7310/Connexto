
import logger from "../config/logger.js";

const globalErrorHandler = (err, req, res, next) => {
  // Log only the error message — no stack trace
  logger.error(`${err.name || "Error"}: ${err.message}`);

  // Handle common Mongoose errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors || {})
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({
      status: "fail",
      message: messages || "Validation failed",
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "fail",
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  if (err.code === 11000) {
    const key = Object.keys(err.keyValue || {}).join(", ");
    return res.status(400).json({
      status: "fail",
      message: `Duplicate field value for: ${key}`,
    });
  }

  // Default safe response
  const statusCode = err.statusCode || 500;
  const message =
    err.isOperational && err.message
      ? err.message
      : "Something went wrong on the server";

  res.status(statusCode).json({
    status: statusCode < 500 ? "fail" : "error",
    message,
  });
};

export default globalErrorHandler;
