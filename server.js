const express = require("express");
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Define your API routes here
app.get('/', (req, res) => {
    res.send("Welcome to ChatHub!");
});

// Error middleware = should be placed after routes
app.use(errorMiddleware);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening of port: ${PORT}`);
});