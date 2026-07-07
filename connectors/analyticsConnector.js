const axios = require("axios");
const config = require("../config/config");

const sendToAnalyticsPlatform =
    async (financialData) => {

    const response = await axios.post(
        config.analyticsApiUrl,
        financialData,
        { timeout: 10000 }
    );

    return response.data;
};

module.exports = {
    sendToAnalyticsPlatform
};
