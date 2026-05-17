const express = require("express");

const router = express.Router();

const {
    processIntegration
} = require("../services/integrationService");

router.post(
    "/run-integration",
    async (req, res) => {

        try {

            const result =
                await processIntegration();

            res.status(200).json(result);

        } catch (error) {

            res.status(500).json({
                message:
                    "Integration failed",
                error: error.message
            });
        }
    }
);

module.exports = router;

const validationMiddleware =
    require("../middleware/validationMiddleware");

router.post(
    "/custom-integration",
    validationMiddleware,
    async (req, res) => {

        try {

            const financialData = req.body;

            res.status(200).json({
                success: true,
                message:
                    "Custom financial data received",
                data: financialData
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
);