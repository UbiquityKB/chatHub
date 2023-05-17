const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Get all messages route
router.get('/', authMiddleware, messageController.getAllMessages);

// Create message route with request validation
router.post('/', authMiddleware, validationMiddleware, messageController.createMessage);

// Get message by ID route
router.get('/:id', authMiddleware, messageController.getMessageById);

// Update message route with request validation
router.put('/:id', authMiddleware, validationMiddleware, messageController.updateMessage);

// Delete message route
router.delete('/:id', authMiddleware, messageController.deleteMessage);

module.exports = router;
