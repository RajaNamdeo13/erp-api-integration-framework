const fs = require("fs");
const path = require("path");
const logger = require("../config/logger");

const logIntegration = (logData) => {

    const logFilePath = path.join(
        __dirname,
        "../logs/integrationLogs.txt"
    );

    const logEntry = `
Time: ${new Date().toISOString()}
Status: ${logData.status}
Message: ${logData.message}
-----------------------------------
`;

    fs.appendFileSync(logFilePath, logEntry);

    logger.info("integration_event", logData);
};

module.exports = { logIntegration };
