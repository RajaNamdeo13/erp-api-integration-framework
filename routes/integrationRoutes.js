const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const validationMiddleware = require("../middleware/validationMiddleware");

const { processIntegration } = require("../services/integrationService");

router.post(
    "/run-integration",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        try {

            const result = await processIntegration();

            res.json(result);

        } catch (err) {

            res.status(500).json({
                success: false,
                message: err.message
            });

        }

    }
);

router.post(
    "/custom-integration",
    authMiddleware,
    roleMiddleware("admin"),
    validationMiddleware,
    async (req, res) => {

        res.json({
            success: true,
            message: "Custom Integration Successful",
            data: req.body
        });

    }
);

module.exports = router;