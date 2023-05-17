const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Register route
router.post('/register', validationMiddleware, authController.register);

// Login route
router.post('/login', validationMiddleware, authController.login);

// Logout route
router.post('logout', authMiddleware, authController.logout);

module.exports = router;
