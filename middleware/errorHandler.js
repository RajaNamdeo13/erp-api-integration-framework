const logger = require("../config/logger");

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found",
    requestId: req.requestId,
  });
}

function errorHandler(err, req, res, next) {
  logger.error("unhandled_error", {
    requestId: req.requestId,
    message: err.message,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: "Internal server error",
    requestId: req.requestId,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
