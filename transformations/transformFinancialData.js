const transformFinancialData = (sapData) => {

    return sapData.map(item => ({
        company: item.company?.name || "Unknown",
        account: item.username,
        amount: Math.floor(Math.random() * 100000),
        year: 2024
    }));
};

module.exports = { transformFinancialData };