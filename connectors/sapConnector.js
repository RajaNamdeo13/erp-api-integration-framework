const axios = require("axios");

const getSAPData = async () => {

    const response = await axios.get(
        process.env.SAP_API_URL
    );

    return response.data;
};

module.exports = { getSAPData };