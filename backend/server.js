require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments");
const paymentRoutes = require("./routes/payment");

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================================
// MIDDLEWARE
// ======================================================

// CORS
const allowedOrigins = [
    "http://127.0.0.1:5500",
    "https://healthynutrition-seven.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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

app.use("/api/payment", paymentRoutes);
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