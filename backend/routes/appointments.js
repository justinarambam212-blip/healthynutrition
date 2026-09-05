const express = require("express");

const Appointment = require("../models/appointment");
const User = require("../models/user");

const authenticateToken =
    require("../middleware/authMiddleware");

const router = express.Router();


// ======================================================
// CREATE APPOINTMENT
// ======================================================

router.post(
    "/",
    authenticateToken,
    async (req, res) => {
console.log("Appointment route reached");
console.log("Request body:", req.body);
console.log("User:", req.user);
        try {

            const {
                phone,
                appointmentType,
                appointmentDate,
                appointmentTime,
                mode,
                reason
            } = req.body;


            // ==========================================
            // CHECK REQUIRED FIELDS
            // ==========================================

            if (
                !phone ||
                !appointmentType ||
                !appointmentDate ||
                !appointmentTime ||
                !mode
            ) {

                return res.status(400).json({
                    message:
                        "Please fill in all required appointment details."
                });

            }


            // ==========================================
            // GET LOGGED-IN USER
            // ==========================================

            const user = await User.findById(
                req.user.userId
            );


            if (!user) {

                return res.status(404).json({
                    message: "User not found."
                });

            }


            // ==========================================
            // CHECK DAILY BOOKING LIMIT
            // ==========================================

            const appointmentCount =
                await Appointment.countDocuments({

                    appointmentDate:
                        appointmentDate,

                    status:
                        "confirmed"

                });


            if (appointmentCount >= 5) {

                return res.status(400).json({

                    message:
                        "This date is fully booked. Please select another date."

                });

            }


            // ==========================================
            // CHECK IF USER ALREADY BOOKED SAME DAY
            // ==========================================

            const existingAppointment =
                await Appointment.findOne({

                    user:
                        user._id,

                    appointmentDate:
                        appointmentDate,

                    status:
                        "confirmed"

                });


            if (existingAppointment) {

                return res.status(400).json({

                    message:
                        "You already have an appointment booked for this date."

                });

            }


            // ==========================================
            // CREATE APPOINTMENT
            // ==========================================

            const appointment =
                await Appointment.create({

                    user:
                        user._id,

                    clientName:
                        user.name,

                    email:
                        user.email,

                    phone:
                        phone.trim(),

                    appointmentType,

                    appointmentDate,

                    appointmentTime,

                    mode,

                    reason:
                        reason ? reason.trim() : ""

                });


            // ==========================================
            // SUCCESS RESPONSE
            // ==========================================

            res.status(201).json({

                message:
                    "Appointment booked successfully!",

                appointment

            });


        } catch (error) {

            console.error(
                "Appointment booking error:",
                error
            );


            res.status(500).json({

                message:
                    "Server error while booking appointment."

            });

        }

    }
);
// ======================================================
// GET BOOKED APPOINTMENT DATES
// ======================================================

router.get(
    "/booked-dates",
    async (req, res) => {

        try {

            const bookedDates =
                await Appointment.aggregate([

                    {
                        $match: {

                            status:
                                "confirmed"

                        }
                    },

                    {
                        $group: {

                            _id:
                                "$appointmentDate",

                            count:
                                {
                                    $sum: 1
                                }

                        }
                    },

                    {
                        $sort: {

                            _id: 1

                        }
                    }

                ]);


            res.status(200).json({

                bookedDates

            });

        } catch (error) {

            console.error(
                "Error fetching booked dates:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to fetch booked dates."

            });

        }

    }
);
// ======================================================
// GET LOGGED-IN USER'S APPOINTMENTS
// ======================================================

router.get(
    "/my-appointments",
    authenticateToken,
    async (req, res) => {

        try {

            const appointments =
                await Appointment.find({

                    user:
                        req.user.userId

                })
                .sort({

                    appointmentDate: 1,

                    appointmentTime: 1

                });


            res.status(200).json({

                appointments

            });

        } catch (error) {

            console.error(
                "Error fetching user appointments:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to fetch appointments."

            });

        }

    }
);
module.exports = router;