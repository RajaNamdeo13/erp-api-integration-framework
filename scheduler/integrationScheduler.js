const cron = require("node-cron");
const config = require("../config/config");
const logger = require("../config/logger");

const {
    processIntegration
} = require("../services/integrationService");
const { recordIntegrationRun } = require("../routes/healthRoutes");

const startIntegrationScheduler = () => {
    if (!config.enableScheduler) {
        logger.info("integration_scheduler_disabled");
        return;
    }

    cron.schedule(config.integrationCron, async () => {

        logger.info("scheduled_integration_started");

        try {

            await processIntegration({ requestId: "scheduler" });
            recordIntegrationRun(true);

            logger.info("scheduled_integration_successful");

        } catch (error) {

            recordIntegrationRun(false);
            logger.error("scheduled_integration_failed", {
                error: error.message
            });
        }
    });
};

module.exports = {
    startIntegrationScheduler
};
