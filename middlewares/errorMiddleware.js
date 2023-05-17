const errorMiddleware = (err, req, res, next) => {
    // Handle specific types of errors
    if (err.name === "Validation Error") {
        return res.status(400).json({ error: err.message });
    }

    // Handle other types of errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
};

module.exports = errorMiddleware;