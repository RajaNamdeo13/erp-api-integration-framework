const loggerMiddleware = (req, res, next) => {

    console.log(
        `${req.method} request received for ${req.url}`
    );

    next();
};

module.exports = loggerMiddleware;