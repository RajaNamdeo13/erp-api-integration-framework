const validationMiddleware = (req, res, next) => {

    const {
        invoice_number,
        customer_name,
        amount,
        currency,
        status
    } = req.body;

    if (
        !invoice_number ||
        !customer_name ||
        amount === undefined ||
        !currency ||
        !status
    ) {
        return res.status(400).json({
            success: false,
            message: "invoice_number, customer_name, amount, currency and status are required",
            requestId: req.requestId
        });
    }

    if (Number.isNaN(Number(amount)) || Number(amount) < 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be a positive number",
            requestId: req.requestId
        });
    }

    next();
};

module.exports = validationMiddleware;