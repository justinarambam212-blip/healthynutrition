require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments");

const app = express();

const PORT = 5000;


// ======================================================
// MIDDLEWARE
// ======================================================

// CORS

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Allow JSON data

app.use(express.json());


// ======================================================
// ROUTES
// ======================================================

// Authentication routes

app.use("/api/auth", authRoutes);


// Appointment routes

app.use("/api/appointments", appointmentRoutes);


// ======================================================
// TEST ROUTE
// ======================================================

app.get("/", (req, res) => {

    res.send("HealthyNutrition Backend is running!");

});


// ======================================================
// CONNECT DATABASE AND START SERVER
// ======================================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {

            console.log(
                `Server running at http://localhost:${PORT}`
            );

        });

    })

    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error
        );

    });