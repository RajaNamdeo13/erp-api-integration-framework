const cron = require("node-cron");

const {
    processIntegration
} = require("../services/integrationService");

const startIntegrationScheduler = () => {

    cron.schedule("*/30 * * * * *", async () => {

        console.log(
            "Running scheduled integration..."
        );

        try {

            await processIntegration();

            console.log(
                "Scheduled integration successful"
            );

        } catch (error) {

            console.log(
                "Scheduled integration failed"
            );

            console.log(error.message);
        }
    });
};

module.exports = {
    startIntegrationScheduler
};