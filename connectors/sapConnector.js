const axios = require("axios");
const config = require("../config/config");

const getSAPData = async () => {
    if (!config.sapApiUrl) {
        throw new Error("SAP_API_URL is not configured");
    }

    const response = await axios.get(
        config.sapApiUrl,
        { timeout: 10000 }
    );

    return response.data;
};

module.exports = { getSAPData };
