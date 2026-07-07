require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const app = express();

// =======================================
// Configuration
// =======================================
const swaggerSpec = require("./config/swagger");

// =======================================
// Middlewares
// =======================================
const requestContextMiddleware = require("./middleware/requestContextMiddleware");
const loggerMiddleware = require("./middleware/loggerMiddleware");
// =======================================
// Routes
// =======================================
const authRoutes = require("./routes/authRoutes");
const financialRoutes = require("./routes/financialRoutes");
const integrationRoutes = require("./routes/integrationRoutes");

// =======================================
// Scheduler
// =======================================
const {
    startIntegrationScheduler,
} = require("./scheduler/integrationScheduler");

// =======================================
// Express Middlewares
// =======================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// =======================================
// Request Context + Logger
// =======================================
app.use(requestContextMiddleware);
app.use(loggerMiddleware);

// =======================================
// Static Files (Dashboard)
// =======================================
app.use(express.static(path.join(__dirname, "public")));

// =======================================
// Swagger Documentation
// =======================================
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// =======================================
// Dashboard Route
// =======================================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================================
// Health Check API
// =======================================
app.get("/health", (req, res) => {

    res.status(200).json({

        success: true,

        application: "ERP Integration Framework",

        version: "1.0.0",

        status: "UP",

        environment: process.env.NODE_ENV,

        uptime: process.uptime(),

        requestId: req.requestId,

        timestamp: new Date()

    });

});

// =======================================
// Metrics API
// =======================================
app.get("/metrics", (req, res) => {

    res.status(200).json({

        success: true,

        nodeVersion: process.version,

        platform: process.platform,

        uptime: process.uptime(),

        memoryUsage: process.memoryUsage(),

        cpuUsage: process.cpuUsage(),

        requestId: req.requestId,

        timestamp: new Date()

    });

});

// =======================================
// Authentication APIs
// =======================================
app.use("/api/auth", authRoutes);

// =======================================
// Version 1 APIs
// =======================================
app.use("/api/v1", financialRoutes);
app.use("/api/v1", integrationRoutes);

// =======================================
// 404 Handler
// =======================================
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API Route Not Found",

        requestId: req.requestId

    });

});

// =======================================
// Global Error Handler
// =======================================
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Internal Server Error",

        error: process.env.NODE_ENV === "development"
            ? err.message
            : "Unexpected Error",

        requestId: req.requestId

    });

});

// =======================================
// Start Scheduler
// =======================================
startIntegrationScheduler();

// =======================================
// Start Server
// =======================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("\n=================================================");
    console.log(" ERP Integration Framework");
    console.log("=================================================");
    console.log(` Server        : http://localhost:${PORT}`);
    console.log(` Dashboard     : http://localhost:${PORT}`);
    console.log(` Swagger Docs  : http://localhost:${PORT}/api-docs`);
    console.log(` Health API    : http://localhost:${PORT}/health`);
    console.log(` Metrics API   : http://localhost:${PORT}/metrics`);
    console.log(` API Version   : v1`);
    console.log("=================================================\n");

});