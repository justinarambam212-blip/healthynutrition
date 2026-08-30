const cors = require("cors");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

const PORT = 5000;


// Allow JSON data
app.use(express.json());
app.use(cors());

// Authentication routes
app.use("/api/auth", authRoutes);


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Test route
app.get("/", (req, res) => {
    res.send("HealthyNutrition Backend is running!");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});