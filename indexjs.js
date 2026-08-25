/* =========================================================
   HEALTHYNUTRITION
   LANDING PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOGIN / DASHBOARD NAVIGATION
    ===================================================== */

    function goToDashboardOrLogin() {

        /*
            TEMPORARY LOGIN CHECK

            For now we check localStorage.

            Later, when we connect your Node.js backend,
            this will be replaced with real authentication.
        */

        const isLoggedIn =
            localStorage.getItem("isLoggedIn") === "true";


        if (isLoggedIn) {

            // User is already logged in
            window.location.href = "dashboard.html";

        } else {

            // User is not logged in
            window.location.href = "login.html";

        }

    }


    /* =====================================================
       GET STARTED BUTTON
    ===================================================== */

    const getStartedButton =
        document.querySelector(".primary-btn1");


    if (getStartedButton) {

        getStartedButton.addEventListener(
            "click",
            goToDashboardOrLogin
        );

    }


    /* =====================================================
       BOOK APPOINTMENT BUTTON
    ===================================================== */

    const appointmentButton =
        document.querySelector(".generate-btn");


    if (appointmentButton) {

        appointmentButton.addEventListener(
            "click",
            goToDashboardOrLogin
        );

    }


    /* =====================================================
       LOGOUT FUNCTION
       We'll use this later from the dashboard.
    ===================================================== */

    window.logoutUser = function () {

        localStorage.removeItem("isLoggedIn");

        window.location.href = "index.html";

    };

});