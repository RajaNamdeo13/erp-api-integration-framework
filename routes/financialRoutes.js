const express = require("express");

const router = express.Router();

const {
    getFinancialData
} = require("../services/financialService");

router.get("/financial-data", async (req, res) => {

    try {

        const data = await getFinancialData();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch financial data",
            error: error.message
        });
    }
});

module.exports = router;