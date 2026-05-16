const { getSAPData } = require("../connectors/sapConnector");

const {
    transformFinancialData
} = require("../transformations/transformFinancialData");

const getFinancialData = async () => {

    const sapData = await getSAPData();

    const transformedData =
        transformFinancialData(sapData);

    return transformedData;
};

module.exports = { getFinancialData };