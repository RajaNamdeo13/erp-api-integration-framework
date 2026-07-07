require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET || "mySuperSecretKey",
  environment: process.env.NODE_ENV || "development",
  sapApiUrl: process.env.SAP_API_URL,
  analyticsApiUrl:
    process.env.ANALYTICS_API_URL || "https://jsonplaceholder.typicode.com/posts",
  databaseUrl: process.env.DATABASE_URL,
  enableScheduler: process.env.ENABLE_SCHEDULER === "true",
  integrationCron: process.env.INTEGRATION_CRON || "*/30 * * * * *",
};
