const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();


// ======================================================
// RAZORPAY INSTANCE
// ======================================================

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});


// ======================================================
// CREATE PAYMENT ORDER
// ======================================================

router.post(
    "/create-order",
    async (req, res) => {

        try {

            const {

                amount

            } = req.body;


            // ==========================================
            // VALIDATE AMOUNT
            // ==========================================

            if (!amount) {

                return res.status(400).json({

                    message:
                        "Payment amount is required."

                });

            }


            // ==========================================
            // CREATE RAZORPAY ORDER
            // ==========================================

            const options = {

                amount:
                    amount * 100,

                currency:
                    "INR",

                receipt:
                    `receipt_${Date.now()}`

            };


            const order =
                await razorpay.orders.create(
                    options
                );


            // ==========================================
            // SEND ORDER TO FRONTEND
            // ==========================================

            res.status(200).json({

                success: true,

                order,

                key:
                    process.env.RAZORPAY_KEY_ID

            });

        }

        catch (error) {

            console.error(
                "Razorpay order error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to create payment order."

            });

        }

    }
);


module.exports = router;