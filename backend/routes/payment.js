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
// PACKAGE PRICES
// ======================================================

const PACKAGE_PRICES = {

    consultation_only: 500,

    consultation_diet_plan: {

        "1_week": 800,

        "1_month": 1500,

        "2_months": 2500

    }

};


// ======================================================
// CREATE PAYMENT ORDER
// ======================================================

router.post("/create-order", async (req, res) => {

    try {

        const { packageType, planDuration } = req.body;


        // ==========================================
        // VALIDATE PACKAGE TYPE
        // ==========================================

        if (
            !packageType ||
            !Object.prototype.hasOwnProperty.call(
                PACKAGE_PRICES,
                packageType
            )
        ) {

            return res.status(400).json({

                success: false,

                message: "Please select a valid package."

            });

        }


        // ==========================================
        // CALCULATE PACKAGE PRICE
        // ==========================================

        let amount;


        // Consultation Only

        if (packageType === "consultation_only") {

            if (planDuration) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Consultation Only does not require a diet plan duration."

                });

            }

            amount = PACKAGE_PRICES.consultation_only;

        }


        // Consultation + Diet Plan

        else if (packageType === "consultation_diet_plan") {

            if (
                !planDuration ||
                !Object.prototype.hasOwnProperty.call(
                    PACKAGE_PRICES.consultation_diet_plan,
                    planDuration
                )
            ) {

                return res.status(400).json({

                    success: false,

                    message: "Please select a valid diet plan duration."

                });

            }

            amount =
                PACKAGE_PRICES.consultation_diet_plan[planDuration];

        }


        // ==========================================
        // CREATE RAZORPAY ORDER
        // ==========================================

        const options = {

            amount: amount * 100,

            currency: "INR",

            receipt: `receipt_${Date.now()}`,

            notes: {

                packageType: packageType,

                planDuration: planDuration || "not_applicable"

            }

        };


        const order = await razorpay.orders.create(options);


        // ==========================================
        // SEND ORDER TO FRONTEND
        // ==========================================

        res.status(200).json({

            success: true,

            order,

            price: amount,

            packageType,

            planDuration: planDuration || null,

            key: process.env.RAZORPAY_KEY_ID

        });

    }


    catch (error) {

        console.error("Razorpay order error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to create payment order."

        });

    }

});


module.exports = router;