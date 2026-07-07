const express = require("express");
const { isDatabaseConfigured } = require("../config/database");

const router = express.Router();
const startedAt = Date.now();
const metrics = {
  integrationRuns: 0,
  integrationFailures: 0,
};

function recordIntegrationRun(success) {
  metrics.integrationRuns += 1;
  if (!success) {
    metrics.integrationFailures += 1;
  }
}

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptimeSeconds: Math.floor(process.uptime()),
    databaseConfigured: isDatabaseConfigured(),
    timestamp: new Date().toISOString(),
    requestId: req.requestId,
  });
});

router.get("/metrics", (req, res) => {
  res.status(200).json({
    uptimeMs: Date.now() - startedAt,
    memory: process.memoryUsage(),
    metrics,
    requestId: req.requestId,
  });
});

module.exports = {
  router,
  recordIntegrationRun,
};
