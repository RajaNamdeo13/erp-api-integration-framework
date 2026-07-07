const config = require("./config");

const databaseConfig = {
  connectionString: config.databaseUrl,
  ssl:
    config.environment === "production"
      ? { rejectUnauthorized: false }
      : false,
};

function isDatabaseConfigured() {
  return Boolean(config.databaseUrl);
}

module.exports = {
  databaseConfig,
  isDatabaseConfigured,
};
