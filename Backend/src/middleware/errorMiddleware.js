import logger from "../config/logger.js";

const globalErrorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  if (err.name === "ValidationError") {
    err = {
      statusCode: 400,
      message: Object.values(err.errors)
        .map((el) => el.message)
        .join(", "),
    };
  }

  const statusCode = err.statusCode || 500;
  const message =
    err.isOperational && err.message
      ? err.message
      : "Something went wrong on the server";

  res.status(statusCode).json({
    status: err.status || "error",
    message,
  });
};

export default globalErrorHandler;
