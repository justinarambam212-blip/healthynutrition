document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("forgotPasswordForm");
    const emailInput = document.getElementById("email");

    if (!form || !emailInput) {
        return;
    }


    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();

        // Check empty email
        if (email === "") {

            alert("Please enter your email address.");

            return;
        }


        // Check email format
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;
        }


        // Get button
        const button =
            form.querySelector(".reset-btn");

        // Change button while sending
        button.disabled = true;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


        try {

            // Send email to backend
            const response = await fetch(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email
                    })
                }
            );


            const data = await response.json();


            // Successful request
            if (response.ok) {

                alert(
                    data.message ||
                    "If an account exists with this email, a reset link has been sent."
                );

                // Clear input
                emailInput.value = "";

            } else {

                alert(
                    data.message ||
                    "Unable to send reset link. Please try again."
                );

            }


        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );

            alert(
                "Unable to connect to the server. " +
                "Please make sure your backend is running."
            );

        }


        // Restore button
        button.disabled = false;

        button.innerHTML =
            '<i class="fa-regular fa-paper-plane"></i> Send Reset Link';

    });

});