require("dotenv").config();

const express = require("express");

const app = express();

const financialRoutes =
    require("./routes/financialRoutes");

const loggerMiddleware =
    require("./middleware/loggerMiddleware");

const apiKeyMiddleware =
    require("./middleware/apiKeyMiddleware");

app.use(loggerMiddleware);

app.use(apiKeyMiddleware);

app.use("/", financialRoutes);

app.listen(process.env.PORT, () => {
    console.log(
        `Server started on port ${process.env.PORT}`
    );
});