const jwt = require("jsonwebtoken");
// const { secretKey } = require("../config");

function generateToken(payload) {
    return jwt.sign(payload, secretKey);
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}



// Other authentication-related utility functions

module.exports = {
    generateToken,
    verifyToken
};