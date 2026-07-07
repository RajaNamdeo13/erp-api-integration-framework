const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const requestContextMiddleware = require("./middleware/requestContextMiddleware");
const rateLimitMiddleware = require("./middleware/rateLimitMiddleware");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const financialRoutes = require("./routes/financialRoutes");
const integrationRoutes = require("./routes/integrationRoutes");
const { router: healthRoutes } = require("./routes/healthRoutes");

function createApp() {
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(cors());
  app.use(helmet());
  app.use(requestContextMiddleware);
  app.use(rateLimitMiddleware);
  app.use(loggerMiddleware);

  app.use(express.static(path.join(__dirname, "public")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/", financialRoutes);
  app.use("/", integrationRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
