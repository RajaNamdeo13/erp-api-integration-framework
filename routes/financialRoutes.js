const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { getFinancialData } = require("../services/financialService");

router.get(
    "/financial-data",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        try {

            const data = await getFinancialData();

            res.status(200).json(data);

        } catch (err) {

            res.status(500).json({
                success: false,
                message: err.message
            });

        }

    }
);

module.exports = router;