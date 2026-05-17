const axios = require("axios");

const sendToAnalyticsPlatform =
    async (financialData) => {

    const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        financialData
    );

    return response.data;
};

module.exports = {
    sendToAnalyticsPlatform
};