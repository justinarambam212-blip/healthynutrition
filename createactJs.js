document.addEventListener("DOMContentLoaded", function () {


    // ==================================================
    // GET ELEMENTS
    // ==================================================

    const form =
        document.getElementById("signupForm");

    const fullNameInput =
        document.getElementById("fullname");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const termsCheckbox =
        document.getElementById("terms");

    const createAccountBtn =
        document.getElementById("createAccountBtn");

    const togglePassword =
        document.getElementById("togglePassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const passwordMessage =
        document.getElementById("passwordMessage");

    const strengthBars =
        document.querySelectorAll(".strength-bar span");


    // ==================================================
    // SHOW / HIDE PASSWORD
    // ==================================================

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.textContent = "🙈";

                togglePassword.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                togglePassword.textContent = "👁";

                togglePassword.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );


    // ==================================================
    // SHOW / HIDE CONFIRM PASSWORD
    // ==================================================

    toggleConfirmPassword.addEventListener(
        "click",
        function () {

            if (
                confirmPasswordInput.type ===
                "password"
            ) {

                confirmPasswordInput.type = "text";

                toggleConfirmPassword.textContent =
                    "🙈";

                toggleConfirmPassword.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                confirmPasswordInput.type =
                    "password";

                toggleConfirmPassword.textContent =
                    "👁";

                toggleConfirmPassword.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );


    // ==================================================
    // PASSWORD STRENGTH
    // ==================================================

    passwordInput.addEventListener(
        "input",
        function () {

            const password =
                passwordInput.value;

            let strength = 0;


            // Reset bars
            strengthBars.forEach(
                function (bar) {

                    bar.classList.remove(
                        "active",
                        "weak",
                        "medium",
                        "strong"
                    );

                }
            );


            // Check password rules
            if (password.length >= 8) {

                strength++;

            }

            if (/[A-Z]/.test(password)) {

                strength++;

            }

            if (/[0-9]/.test(password)) {

                strength++;

            }

            if (/[^A-Za-z0-9]/.test(password)) {

                strength++;

            }


            // Empty password
            if (password.length === 0) {

                passwordMessage.textContent =
                    "Use at least 8 characters.";

                return;

            }


            // Weak
            if (strength === 1) {

                passwordMessage.textContent =
                    "Weak password.";

                strengthBars[0].classList.add(
                    "active",
                    "weak"
                );

            }


            // Medium
            else if (
                strength === 2 ||
                strength === 3
            ) {

                passwordMessage.textContent =
                    "Good password. You can make it stronger.";

                for (
                    let i = 0;
                    i < strength;
                    i++
                ) {

                    strengthBars[i].classList.add(
                        "active",
                        "medium"
                    );

                }

            }


            // Strong
            else if (strength === 4) {

                passwordMessage.textContent =
                    "Strong password!";

                strengthBars.forEach(
                    function (bar) {

                        bar.classList.add(
                            "active",
                            "strong"
                        );

                    }
                );

            }

        }
    );


    // ==================================================
    // CONFIRM PASSWORD
    // ==================================================

    confirmPasswordInput.addEventListener(
        "input",
        function () {

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            if (confirmPassword === "") {

                confirmPasswordInput.style.borderColor =
                    "";

                return;

            }


            if (password !== confirmPassword) {

                confirmPasswordInput.style.borderColor =
                    "#ef7d8f";

            } else {

                confirmPasswordInput.style.borderColor =
                    "#75c99a";

            }

        }
    );


    // ==================================================
    // CREATE ACCOUNT
    // ==================================================

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const fullName =
                fullNameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            // ==================================================
            // NAME VALIDATION
            // ==================================================

            if (fullName === "") {

                alert(
                    "Please enter your full name."
                );

                fullNameInput.focus();

                return;

            }


            // ==================================================
            // EMAIL VALIDATION
            // ==================================================

            if (email === "") {

                alert(
                    "Please enter your email address."
                );

                emailInput.focus();

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            // ==================================================
            // PASSWORD VALIDATION
            // ==================================================

            if (password.length < 8) {

                alert(
                    "Password must be at least 8 characters long."
                );

                passwordInput.focus();

                return;

            }


            // ==================================================
            // CONFIRM PASSWORD
            // ==================================================

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                confirmPasswordInput.focus();

                return;

            }


            // ==================================================
            // TERMS
            // ==================================================

            if (!termsCheckbox.checked) {

                alert(
                    "Please agree to the Terms of Service and Privacy Policy."
                );

                return;

            }


            // ==================================================
            // BUTTON LOADING
            // ==================================================

            createAccountBtn.disabled = true;

            createAccountBtn.innerHTML =
                "Creating Account... ⏳";


            try {


                // ==================================================
                // SEND DATA TO BACKEND
                // ==================================================

                const response =
                    await fetch(
                        "http://localhost:5000/api/auth/signup",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name: fullName,

                                email: email,

                                password: password

                            })

                        }
                    );


                const data =
                    await response.json();


                // ==================================================
                // SUCCESS
                // ==================================================

                if (response.ok) {


                    // Save JWT
                    localStorage.setItem(
                        "token",
                        data.token
                    );


                    // Save user
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );


                    // Save login status
                    localStorage.setItem(
                        "loggedIn",
                        "true"
                    );


                    alert(
                        "Account created successfully!"
                    );


                    // Go to dashboard
                    window.location.href =
                        "dashboard.html";


                } else {


                    // Backend error
                    alert(
                        data.message ||
                        "Unable to create account."
                    );

                }


            } catch (error) {


                console.error(
                    "Signup error:",
                    error
                );


                alert(
                    "Unable to connect to the server. " +
                    "Please make sure your backend is running."
                );


            } finally {


                // ==================================================
                // RESTORE BUTTON
                // ==================================================

                createAccountBtn.disabled = false;

                createAccountBtn.innerHTML =
                    "Create Account <span>→</span>";

            }

        }
    );

});