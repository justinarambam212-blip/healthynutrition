const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================================
// SIGN UP
// ======================================================

router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Please fill in all fields"
            });

        }

        // Check password length
        if (password.length < 8) {

            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });

        }

        // Normalize email
        const normalizedEmail =
            email.toLowerCase().trim();

        // Check if email already exists
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email is already registered"
            });

        }

        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({

            name: name.trim(),

            email: normalizedEmail,

            password: hashedPassword

        });

        // Create JWT
        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        // Send response
        res.status(201).json({

            message: "Account created successfully",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    } catch (error) {

        console.error("Signup error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ======================================================
// LOGIN
// ======================================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {

            return res.status(400).json({
                message: "Please enter email and password"
            });

        }

        // Normalize email
        const normalizedEmail =
            email.toLowerCase().trim();

        // Find user
        const user = await User.findOne({
            email: normalizedEmail
        });

        // User doesn't exist
        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        // Password incorrect
        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        // Create JWT
        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        // Send response
        res.status(200).json({

            message: "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


// ======================================================
// PROTECTED TEST ROUTE
// ======================================================

router.get(
    "/protected",
    authenticateToken,
    async (req, res) => {

        try {

            // req.user comes from authMiddleware
            const userId = req.user.userId;

            // Find the logged-in user
            const user = await User.findById(userId)
                .select("-password");

            if (!user) {

                return res.status(404).json({
                    message: "User not found"
                });

            }

            res.status(200).json({

                message: "You have access to this protected route",

                user: {

                    id: user._id,

                    name: user.name,

                    email: user.email

                }

            });

        } catch (error) {

            console.error(
                "Protected route error:",
                error
            );

            res.status(500).json({
                message: "Server error"
            });

        }

    }
);


module.exports = router;