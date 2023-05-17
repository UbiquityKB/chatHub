if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const routes = require('./routes');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/chatHub';

// Connect to MongoDB
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('MongoDB Connection Established.');
});

// Middleware:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

// Routes:
app.use("/api", routes);

// Error handling middleware:
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500.json({message: "Internal Server Error"}));
});

// Start the server:
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port &{PORT}`);
});