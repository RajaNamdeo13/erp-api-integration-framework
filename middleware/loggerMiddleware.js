const logger = require("../config/logger");

function loggerMiddleware(req, res, next) {

    res.on("finish", () => {

        const duration = Date.now() - req.startTime;

        logger.info({

            requestId: req.requestId,

            method: req.method,

            url: req.originalUrl,

            status: res.statusCode,

            responseTime: `${duration} ms`,

            ip: req.ip,

            userAgent: req.get("User-Agent"),

            timestamp: new Date().toISOString()

        });

    });

    next();
}

module.exports = loggerMiddleware;