const crypto = require("crypto");

function requestContextMiddleware(req, res, next) {

    req.requestId = req.headers["x-request-id"] || crypto.randomUUID();

    // Start timer for request
    req.startTime = Date.now();

    res.setHeader("X-Request-ID", req.requestId);

    next();
}

module.exports = requestContextMiddleware;