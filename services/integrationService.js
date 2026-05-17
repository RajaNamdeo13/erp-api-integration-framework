const {
    getSAPData
} = require("../connectors/sapConnector");

const {
    transformFinancialData
} = require("../transformations/transformFinancialData");

const {
    sendToAnalyticsPlatform
} = require("../connectors/analyticsConnector");

const {
    logIntegration
} = require("./logService");

const processIntegration = async () => {

    let attempts = 3;

    while (attempts > 0) {

        try {

            console.log(
                `Integration attempt: ${
                    4 - attempts
                }`
            );

            // Extract
            const sapData =
                await getSAPData();

            // Transform
            const transformedData =
                transformFinancialData(
                    sapData
                );

            // Load
            const analyticsResponse =
                await sendToAnalyticsPlatform(
                    transformedData
                );

            // Success Log
            logIntegration({
                status: "SUCCESS",
                message:
                    "Financial data synced successfully"
            });

            return {
                success: true,
                message:
                    "Integration completed successfully",
                analyticsResponse
            };

        } catch (error) {

            attempts--;

            console.log(
                `Retry attempts left: ${attempts}`
            );

            logIntegration({
                status: "FAILED",
                message: error.message
            });

            if (attempts === 0) {

                throw new Error(
                    "Integration failed after retries"
                );
            }
        }
    }
};

module.exports = { processIntegration };