require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;


// Allow JSON data
app.use(express.json());


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