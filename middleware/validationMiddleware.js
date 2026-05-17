const validationMiddleware =
    (req, res, next) => {

    const {
        company,
        account,
        amount,
        year
    } = req.body;

    if (
        !company ||
        !account ||
        !amount ||
        !year
    ) {

        return res.status(400).json({
            message:
                "All fields are required"
        });
    }

    next();
};

module.exports = validationMiddleware;