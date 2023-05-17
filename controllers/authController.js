const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken, verifyToken } = require("../utils/authUtils");

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Compare the passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'secretkey');

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    try {
      // Clear the token from the client-side (e.g., remove it from local storage or cookies)
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = authController;
