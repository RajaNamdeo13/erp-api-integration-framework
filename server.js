const express = require("express");

const app = express();

app.get("/financial-data", (req, res) => {

    // Simulated SAP Data
    const sapData = [
        {
            CompanyCode: "1000",
            GLAccount: "400000",
            AmountInCompanyCodeCurrency: "50000",
            FiscalYear: "2024"
        },
        {
            CompanyCode: "2000",
            GLAccount: "500000",
            AmountInCompanyCodeCurrency: "75000",
            FiscalYear: "2024"
        }
    ];

    // Transformation Logic
    const transformedData = sapData.map(item => ({
        company: item.CompanyCode,
        account: item.GLAccount,
        amount: Number(item.AmountInCompanyCodeCurrency),
        year: Number(item.FiscalYear)
    }));

    // Send Response
    res.json(transformedData);
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});