const fs = require("fs");

const path = require("path");

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
};

module.exports = { logIntegration };