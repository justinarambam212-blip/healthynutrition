const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
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

        status: {
            type: String,
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

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);

module.exports = Appointment;