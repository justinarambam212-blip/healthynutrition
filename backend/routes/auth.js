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

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Please fill in all fields"
            });

        }

        if (password.length < 8) {

            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });

        }

        const normalizedEmail =
            email.toLowerCase().trim();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email is already registered"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({

            name: name.trim(),

            email: normalizedEmail,

            password: hashedPassword

        });

        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

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

        if (!email || !password) {

            return res.status(400).json({

                message: "Please enter email and password"

            });

        }

        const normalizedEmail =
            email.toLowerCase().trim();

        const user = await User.findOne({

            email: normalizedEmail

        });

        if (!user) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }

        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

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
// GET CLIENT PROFILE
// ======================================================

router.get(
    "/profile",
    authenticateToken,
    async (req, res) => {

        try {

            const user = await User.findById(
                req.user.userId
            ).select("-password");

            if (!user) {

                return res.status(404).json({

                    message: "User not found"

                });

            }

            res.status(200).json({

                message: "Profile loaded successfully",

                user

            });

        } catch (error) {

            console.error(
                "Get profile error:",
                error
            );

            res.status(500).json({

                message: "Unable to load profile"

            });

        }

    }
);


// ======================================================
// UPDATE CLIENT PROFILE
// ======================================================

router.put(
    "/profile",
    authenticateToken,
    async (req, res) => {

        try {

            const userId = req.user.userId;

            const {
                name,
                email,
                dateOfBirth,
                gender,
                bloodGroup,
                maritalStatus,
                occupation,
                phone,
                address,
                height,
                weight,
                lifestyle,
                foodHabits,
                vegetarianType,
                meatFrequency,
                lactoseIntolerant,
                hasFoodAllergies,
                allergyDetails,
                typicalMealtimes,
                mealSystem,
                weightChange,
                weightChangeKg,
                alcoholConsumption,
                alcoholDetails,
                gymGoer,
                gymTiming,
                supplementUse,
                supplementDetails,
                chiefComplaint,
                consultationPreference,
                diet,
                profilePicture
            } = req.body;


            // ------------------------------------------
            // REQUIRED BASIC INFORMATION
            // ------------------------------------------

            if (!name || !name.trim()) {

                return res.status(400).json({

                    message: "Full name is required"

                });

            }

            if (!email || !email.trim()) {

                return res.status(400).json({

                    message: "Email address is required"

                });

            }


            const normalizedEmail =
                email.toLowerCase().trim();


            // ------------------------------------------
            // CHECK EMAIL
            // ------------------------------------------

            const existingUser =
                await User.findOne({

                    email: normalizedEmail,

                    _id: { $ne: userId }

                });


            if (existingUser) {

                return res.status(400).json({

                    message:
                        "This email is already registered to another account"

                });

            }


            // ------------------------------------------
            // FIND CLIENT
            // ------------------------------------------

            const user =
                await User.findById(userId);


            if (!user) {

                return res.status(404).json({

                    message: "User not found"

                });

            }


            // ------------------------------------------
            // UPDATE PROFILE
            // ------------------------------------------

            user.name =
                name.trim();

            user.email =
                normalizedEmail;

            user.dateOfBirth =
                dateOfBirth || "";

            user.gender =
                gender || "";

            user.bloodGroup =
                bloodGroup || "";

            user.maritalStatus =
                maritalStatus || "";

            user.occupation =
                occupation ? occupation.trim() : "";

            user.phone =
                phone ? phone.trim() : "";

            user.address =
                address ? address.trim() : "";

            user.height =
                height !== "" &&
                height !== null &&
                height !== undefined
                    ? Number(height)
                    : null;

            user.weight =
                weight !== "" &&
                weight !== null &&
                weight !== undefined
                    ? Number(weight)
                    : null;

            user.lifestyle =
                lifestyle || "";

            user.foodHabits =
                foodHabits || "";

            user.vegetarianType =
                vegetarianType || "";

            user.meatFrequency =
                meatFrequency || "";

            user.lactoseIntolerant =
                lactoseIntolerant || "";

            user.hasFoodAllergies =
                hasFoodAllergies || "";

            user.allergyDetails =
                allergyDetails
                    ? allergyDetails.trim()
                    : "";

            user.typicalMealtimes =
                typicalMealtimes
                    ? typicalMealtimes.trim()
                    : "";

            user.mealSystem =
                mealSystem || "";

            user.weightChange =
                weightChange || "";

            user.weightChangeKg =
                weightChangeKg !== "" &&
                weightChangeKg !== null &&
                weightChangeKg !== undefined
                    ? Number(weightChangeKg)
                    : null;

            user.alcoholConsumption =
                alcoholConsumption || "";

            user.alcoholDetails =
                alcoholDetails
                    ? alcoholDetails.trim()
                    : "";

            user.gymGoer =
                gymGoer || "";

            user.gymTiming =
                gymTiming
                    ? gymTiming.trim()
                    : "";

            user.supplementUse =
                supplementUse || "";

            user.supplementDetails =
                supplementDetails
                    ? supplementDetails.trim()
                    : "";

            user.chiefComplaint =
                chiefComplaint
                    ? chiefComplaint.trim()
                    : "";

            user.consultationPreference =
                consultationPreference || "";

            user.diet =
                diet || "";

            user.profilePicture =
                profilePicture || "";


            // ------------------------------------------
            // SAVE TO MONGODB
            // ------------------------------------------

            await user.save();


            // ------------------------------------------
            // CHECK PROFILE COMPLETENESS
            // ------------------------------------------

            const profileComplete =
                Boolean(
                    user.name &&
                    user.email &&
                    user.dateOfBirth &&
                    user.gender &&
                    user.phone &&
                    user.address &&
                    user.bloodGroup &&
                    user.height &&
                    user.weight &&
                    user.foodHabits &&
                    user.mealSystem &&
                    user.weightChange &&
                    user.alcoholConsumption &&
                    user.supplementUse &&
                    user.consultationPreference
                );


            // ------------------------------------------
            // RESPONSE
            // ------------------------------------------

            res.status(200).json({

                message:
                    "Profile updated successfully",

                profileComplete,

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                    bloodGroup: user.bloodGroup,
                    maritalStatus: user.maritalStatus,
                    occupation: user.occupation,
                    phone: user.phone,
                    address: user.address,
                    height: user.height,
                    weight: user.weight,
                    lifestyle: user.lifestyle,
                    foodHabits: user.foodHabits,
                    vegetarianType: user.vegetarianType,
                    meatFrequency: user.meatFrequency,
                    lactoseIntolerant: user.lactoseIntolerant,
                    hasFoodAllergies: user.hasFoodAllergies,
                    allergyDetails: user.allergyDetails,
                    typicalMealtimes: user.typicalMealtimes,
                    mealSystem: user.mealSystem,
                    weightChange: user.weightChange,
                    weightChangeKg: user.weightChangeKg,
                    alcoholConsumption: user.alcoholConsumption,
                    alcoholDetails: user.alcoholDetails,
                    gymGoer: user.gymGoer,
                    gymTiming: user.gymTiming,
                    supplementUse: user.supplementUse,
                    supplementDetails: user.supplementDetails,
                    chiefComplaint: user.chiefComplaint,
                    consultationPreference:
                        user.consultationPreference,
                    diet: user.diet,
                    profilePicture:
                        user.profilePicture,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }

            });

        } catch (error) {

            console.error(
                "Update profile error:",
                error
            );

            res.status(500).json({

                message:
                    "Unable to update profile"

            });

        }

    }
);


// ======================================================
// PROTECTED ROUTE
// ======================================================

router.get(
    "/protected",
    authenticateToken,
    async (req, res) => {

        try {

            const userId =
                req.user.userId;

            const user =
                await User.findById(userId)
                    .select("-password");


            if (!user) {

                return res.status(404).json({

                    message: "User not found"

                });

            }


            // Check whether profile is complete

            const profileComplete =
                Boolean(
                    user.name &&
                    user.email &&
                    user.dateOfBirth &&
                    user.gender &&
                    user.phone &&
                    user.address &&
                    user.bloodGroup &&
                    user.height &&
                    user.weight &&
                    user.foodHabits &&
                    user.mealSystem &&
                    user.weightChange &&
                    user.alcoholConsumption &&
                    user.supplementUse &&
                    user.consultationPreference
                );


            res.status(200).json({

                message:
                    "User authenticated successfully",

                profileComplete,

                user: {

                    id: user._id,

                    name: user.name,

                    email: user.email,

                    dateOfBirth:
                        user.dateOfBirth,

                    gender:
                        user.gender,

                    bloodGroup:
                        user.bloodGroup,

                    phone:
                        user.phone,

                    address:
                        user.address,

                    height:
                        user.height,

                    weight:
                        user.weight,

                    profilePicture:
                        user.profilePicture,

                    createdAt:
                        user.createdAt,

                    updatedAt:
                        user.updatedAt

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