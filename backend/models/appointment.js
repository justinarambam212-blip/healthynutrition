const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        // ==========================================
        // CLIENT INFORMATION
        // ==========================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        clientName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        // ==========================================
        // APPOINTMENT DETAILS
        // ==========================================

        appointmentType: {
            type: String,
            required: true,
            enum: [
                "initial",
                "followup",
                "child"
            ]
        },

        appointmentDate: {
            type: String,
            required: true
        },

        appointmentTime: {
            type: String,
            required: true
        },

        mode: {
            type: String,
            required: true,
            enum: [
                "online",
                "in-person"
            ]
        },

        reason: {
            type: String,
            trim: true,
            default: ""
        },

        // ==========================================
        // PACKAGE DETAILS
        // ==========================================

        packageType: {
            type: String,
            required: true,
            enum: [
                "consultation_diet_plan"
            ],
            default: "consultation_diet_plan"
        },

        planDuration: {
            type: String,
            required: true,
            enum: [
                "1_week",
                "1_month",
                "2_months"
            ]
        },

        planPrice: {
            type: Number,
            required: true,
            min: 0
        },

        // ==========================================
        // PAYMENT DETAILS
        // ==========================================

        paymentStatus: {
            type: String,
            required: true,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded"
            ],
            default: "pending"
        },

        razorpayOrderId: {
            type: String,
            default: null
        },

        razorpayPaymentId: {
            type: String,
            default: null
        },

        // ==========================================
        // DIET PLAN DURATION
        // ==========================================

        planStartDate: {
            type: Date,
            required: true
        },

        planExpiryDate: {
            type: Date,
            required: true
        },

        // ==========================================
        // APPOINTMENT STATUS
        // ==========================================

        status: {
            type: String,
            required: true,
            enum: [
                "confirmed",
                "cancelled"
            ],
            default: "confirmed"
        }
    },
    {
        timestamps: true
    }
);

// ==========================================
// CREATE APPOINTMENT MODEL
// ==========================================

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);

module.exports = Appointment;