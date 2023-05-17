const Message = require("../models/Message");

// Controller functions for message endpoints
exports.getAllMessages = async (req, res) => {
  // Get all message Logic
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch message" });
  }
};

exports.createMessage = async (req, res) => {
  // Create message logic
  try {
    const { content, author } = req.body;
    const newMessage = await Message.create({ content, author });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message "});
  }
};

exports.getMessageById = async (req, res) => {
  // Get message by ID logic
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch message"});
  }
};

exports.updateMessage = async (req, res) => {
  // Update message logic
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(id, { content }, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found"});
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to update message"});
  }
};

exports.deleteMessage = async (req, res) => {
  // Delete message logic
  try {
    const { id } = req.params;
    const deletedMessages = await Message.findByIdAndRemove(id);
    if (!deletedMessages) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete message: "});
  }
};
