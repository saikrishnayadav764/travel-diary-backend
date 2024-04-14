// app.js

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const authRoutes = require("./routes/authRoutes");
const diaryRoutes = require("./routes/diaryRoutes");

// Load environment variables
require("dotenv").config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);

// Error handling middleware
app.use(errorHandler);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
