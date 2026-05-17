require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

const financialRoutes =
    require("./routes/financialRoutes");

const loggerMiddleware =
    require("./middleware/loggerMiddleware");

const apiKeyMiddleware =
    require("./middleware/apiKeyMiddleware");

const integrationRoutes =
    require("./routes/integrationRoutes");

const{
    startIntegrationScheduler} = require("./scheduler/integrationScheduler");

app.use("/", integrationRoutes);

app.use(loggerMiddleware);

app.use(apiKeyMiddleware);

app.use("/", financialRoutes);

startIntegrationScheduler();

app.listen(process.env.PORT, () => {
    console.log(
        `Server started on port ${process.env.PORT}`
    );
});