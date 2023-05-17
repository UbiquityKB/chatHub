const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = validationMiddleware;