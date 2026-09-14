const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // -----------------------------
        // BASIC ACCOUNT INFORMATION
        // -----------------------------

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        // -----------------------------
        // PERSONAL DETAILS
        // -----------------------------

        dateOfBirth: {
            type: String,
            default: ""
        },

        gender: {
            type: String,
            default: ""
        },

        bloodGroup: {
            type: String,
            default: ""
        },

        maritalStatus: {
            type: String,
            default: ""
        },

        occupation: {
            type: String,
            default: "",
            trim: true
        },

        // -----------------------------
        // CONTACT INFORMATION
        // -----------------------------

        phone: {
            type: String,
            default: "",
            trim: true
        },

        address: {
            type: String,
            default: "",
            trim: true
        },

        // -----------------------------
        // BODY DETAILS
        // -----------------------------

        height: {
            type: Number,
            default: null
        },

        weight: {
            type: Number,
            default: null
        },

        // -----------------------------
        // NUTRITION & LIFESTYLE
        // -----------------------------

        lifestyle: {
            type: String,
            default: ""
        },

        foodHabits: {
            type: String,
            default: ""
        },

        vegetarianType: {
            type: String,
            default: ""
        },

        meatFrequency: {
            type: String,
            default: ""
        },

        lactoseIntolerant: {
            type: String,
            default: ""
        },

        hasFoodAllergies: {
            type: String,
            default: ""
        },

        allergyDetails: {
            type: String,
            default: "",
            trim: true
        },

        typicalMealtimes: {
            type: String,
            default: "",
            trim: true
        },

        mealSystem: {
            type: String,
            default: ""
        },

        weightChange: {
            type: String,
            default: ""
        },

        weightChangeKg: {
            type: Number,
            default: null
        },

        alcoholConsumption: {
            type: String,
            default: ""
        },

        alcoholDetails: {
            type: String,
            default: "",
            trim: true
        },

        gymGoer: {
            type: String,
            default: ""
        },

        gymTiming: {
            type: String,
            default: "",
            trim: true
        },

        supplementUse: {
            type: String,
            default: ""
        },

        supplementDetails: {
            type: String,
            default: "",
            trim: true
        },

        chiefComplaint: {
            type: String,
            default: "",
            trim: true
        },

        consultationPreference: {
            type: String,
            default: ""
        },

        // -----------------------------
        // OTHER INFORMATION
        // -----------------------------

        diet: {
            type: String,
            default: ""
        },

        // -----------------------------
        // PROFILE PHOTO
        // -----------------------------

        profilePicture: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;