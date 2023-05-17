const User = require("../models/User");

// Controller functions for user endpoints:
exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists:
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Create new user
        const newUser = new User({
            username,
            password
        });

        // Save the user to the database:
        await newUser.save();

        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById;

        if (!user) {
            return res.status(400).json({ error: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        // Check if the user exists:
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        // Update the user's username and password:
        user.username = username;
        user.password = password;

        // Save the updated user to the database:
        await user.save();

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user exists:
        const user = await user.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user from the database:
        await user.remove();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Internal server error" });
    }
};