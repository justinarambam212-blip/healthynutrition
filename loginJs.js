document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const rememberMe = document.querySelector('input[type="checkbox"]');


    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();


        // Check if fields are empty
        if (email === "" || password === "") {
            alert("Please enter your email and password.");
            return;
        }


        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }


        try {

            // Send login information to backend
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            // Login successful
            if (response.ok) {

                // Save authentication token
                localStorage.setItem("token", data.token);

                // Save user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                // Save login status
                localStorage.setItem("loggedIn", "true");


                // Remember email
                if (rememberMe.checked) {

                    localStorage.setItem(
                        "rememberedEmail",
                        email
                    );

                } else {

                    localStorage.removeItem(
                        "rememberedEmail"
                    );
                }


                alert("Login successful!");

                // Go to dashboard
                window.location.href = "dashboard.html";

            } else {

                alert(
                    data.message ||
                    "Incorrect email or password."
                );
            }


        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Unable to connect to the server. " +
                "Please make sure the backend is running."
            );
        }

    });


    // Load remembered email
    const rememberedEmail =
        localStorage.getItem("rememberedEmail");


    if (rememberedEmail) {

        emailInput.value = rememberedEmail;
        rememberMe.checked = true;

    }

});