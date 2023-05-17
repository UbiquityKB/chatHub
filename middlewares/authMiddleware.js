const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        // Get the access token from the request headers
        const token = req.headers.authorization;

        // Verify the access token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Find the use associated with the token
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Attach the user object to the request for further processing
        req.user = user;

        //Continue to the next middleware or route handler
        next();
    } catch (error) {
        //Handle authentication errors
        res.status(400).json({ error: "Authentication failed" });
    }
}; 

module.exports = authMiddleware;