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
const logger = require("../config/logger");

const processIntegration = async (context = {}) => {

    let attempts = 3;

    while (attempts > 0) {

        try {

            logger.info("integration_attempt", {
                requestId: context.requestId,
                attempt: 4 - attempts
            });

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
                    "Financial data synced successfully",
                requestId: context.requestId
            });

            return {
                success: true,
                message:
                    "Integration completed successfully",
                analyticsResponse
            };

        } catch (error) {

            attempts--;

            logger.warn("integration_retry", {
                requestId: context.requestId,
                attemptsLeft: attempts,
                error: error.message
            });

            logIntegration({
                status: "FAILED",
                message: error.message,
                requestId: context.requestId
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
