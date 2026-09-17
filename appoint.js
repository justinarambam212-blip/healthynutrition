/* =========================================================
   HEALTHYNUTRITION
   APPOINTMENT JAVASCRIPT
========================================================= */

console.log("Appointment JavaScript loaded!");


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       1. NUTRITION CAROUSEL
    ===================================================== */

    const nutritionCards =
        document.querySelectorAll(".nutrition-card");


    const nutritionSlider =
        document.querySelector(".nutrition-slider");


    let currentCard = 0;


    function showNutritionCard(index) {

        if (!nutritionCards.length || !nutritionSlider) {
            return;
        }


        if (index < 0) {

            index =
                nutritionCards.length - 1;

        }


        if (index >= nutritionCards.length) {

            index = 0;

        }


        currentCard = index;


        nutritionCards.forEach((card, i) => {

            card.classList.remove(
                "active",
                "previous",
                "next"
            );


            if (i === currentCard) {

                card.classList.add("active");

            }


            else if (

                i ===
                (
                    currentCard - 1 +
                    nutritionCards.length
                ) %
                nutritionCards.length

            ) {

                card.classList.add("previous");

            }


            else if (

                i ===
                (
                    currentCard + 1
                ) %
                nutritionCards.length

            ) {

                card.classList.add("next");

            }

        });

    }


    showNutritionCard(currentCard);



    /* =====================================================
       2. SIDEBAR NAVIGATION
    ===================================================== */

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach((nav) => {

                    nav.classList.remove("active");

                });


                item.classList.add("active");

            }
        );

    });



    /* =====================================================
       3. NOTIFICATION BUTTON
    ===================================================== */

    const notificationButton =
        document.querySelector(".notification-btn");


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                console.log(
                    "Notifications clicked"
                );

            }
        );

    }



    /* =====================================================
       4. PROFILE AREA
    ===================================================== */

    const profileArea =
        document.querySelector(".profile-area");


    if (profileArea) {

        profileArea.addEventListener(
            "click",
            () => {

                console.log(
                    "Profile clicked"
                );

            }
        );

    }



    /* =====================================================
       5. MEAL ROW INTERACTION
    ===================================================== */

    const mealRows =
        document.querySelectorAll(".meal-row");


    mealRows.forEach((row) => {

        row.addEventListener(
            "click",
            () => {

                row.classList.toggle(
                    "completed"
                );

            }
        );

    });



    /* =====================================================
       6. SOFT BUTTONS
    ===================================================== */

    const softButtons =
        document.querySelectorAll(".soft-btn");


    softButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                console.log(
                    "Button clicked:",
                    button.textContent.trim()
                );

            }
        );

    });



    /* =====================================================
       7. EXPERT BUTTON
    ===================================================== */

    const expertButton =
        document.querySelector(".expert-btn");


    if (expertButton) {

        expertButton.addEventListener(
            "click",
            () => {

                console.log(
                    "Expert button clicked"
                );

            }
        );

    };



    /* =====================================================
       8. REMINDER INTERACTION
    ===================================================== */

    const reminder =
        document.querySelector(".reminder");


    if (reminder) {

        reminder.addEventListener(
            "click",
            () => {

                reminder.classList.toggle(
                    "completed"
                );

            }
        );

    };



    /* =====================================================
       9. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll("button");


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");


                ripple.classList.add("ripple");


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    event.clientX -
                    rect.left +
                    "px";


                ripple.style.top =
                    event.clientY -
                    rect.top +
                    "px";


                button.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });



    /* =====================================================
       10. UPDATE NUTRITION DATA
    ===================================================== */

    window.updateNutritionData =
        function (data) {

            if (!data) {
                return;
            }


            console.log(
                "Nutrition data updated:",
                data
            );

        };



    /* =====================================================
       11. TEMPORARY MEAL PLANS
    ===================================================== */

    const mealPlans = {

        "client-001": {

            breakfast:
                "Oatmeal with banana",

            lunch:
                "Brown rice with chicken and vegetables",

            dinner:
                "Grilled fish with salad"

        },


        "client-002": {

            breakfast:
                "Eggs with whole wheat toast",

            lunch:
                "Rice with vegetables and chickpeas",

            dinner:
                "Chicken with vegetables"

        }

    };


    window.mealPlans =
        mealPlans;



    /* =====================================================
       12. PROGRESS BAR
    ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar");


    progressBars.forEach((bar) => {

        const value =
            bar.getAttribute("data-progress");


        if (value) {

            bar.style.width =
                value + "%";

        }

    });



    /* =====================================================
       13. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");


    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });



    /* =====================================================
       14. KEYBOARD CAROUSEL CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!nutritionCards.length) {
                return;
            }


            if (
                event.key === "ArrowLeft"
            ) {

                showNutritionCard(
                    currentCard - 1
                );

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNutritionCard(
                    currentCard + 1
                );

            }

        }
    );



    /* =====================================================
       15. TOUCH / SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (nutritionSlider) {

        nutritionSlider.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            }
        );


        nutritionSlider.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(difference) < 50
                ) {

                    return;

                }


                if (difference > 0) {

                    showNutritionCard(
                        currentCard + 1
                    );

                }


                else {

                    showNutritionCard(
                        currentCard - 1
                    );

                }

            }
        );

    }



    /* =====================================================
       16. APPOINTMENT CALENDAR
    ===================================================== */

    const calendarDays =
        document.getElementById(
            "calendarDays"
        );


    const calendarMonth =
        document.getElementById(
            "calendarMonth"
        );


    const selectedDateText =
        document.getElementById(
            "selectedDateText"
        );


    const appointmentDate =
        document.getElementById(
            "appointmentDate"
        );


    const appointmentTime =
        document.getElementById(
            "appointmentTime"
        );


    const prevMonth =
        document.getElementById(
            "prevMonth"
        );


    const nextMonth =
        document.getElementById(
            "nextMonth"
        );



    /* =====================================================
       DATE HELPERS
    ===================================================== */

    function getTodayDateString() {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }



    /* =====================================================
       CHECK IF APPOINTMENT HOURS ARE OVER

       Last appointment = 3:00 PM

       At 3:00 PM or later,
       today's appointment booking closes.
    ===================================================== */

    function isAppointmentHoursOver() {

        const now =
            new Date();


        const currentHour =
            now.getHours();


        const currentMinute =
            now.getMinutes();


        if (currentHour > 15) {

            return true;

        }


        if (
            currentHour === 15 &&
            currentMinute >= 0
        ) {

            return true;

        }


        return false;

    }



    /* =====================================================
       UPDATE AVAILABLE TIME SLOTS

       For today's date:
       Passed slots are disabled.

       For future dates:
       All slots are available.
    ===================================================== */

    function updateAvailableTimeSlots() {

        if (
            !appointmentDate ||
            !appointmentTime
        ) {

            return;

        }


        const selectedDate =
            appointmentDate.value;


        const todayString =
            getTodayDateString();


        /*
           Reset selected time whenever
           the date changes.
        */

        appointmentTime.value = "";


        const options =
            appointmentTime.querySelectorAll(
                "option"
            );


        options.forEach((option) => {


            /*
               Ignore placeholder option.
            */

            if (!option.value) {

                return;

            }


            /*
               Future date.

               Enable every slot.
            */

            if (
                selectedDate !== todayString
            ) {

                option.disabled =
                    false;


                option.hidden =
                    false;


                return;

            }


            /*
               TODAY

               Compare each appointment
               time with current time.
            */

            const now =
                new Date();


            const currentHour =
                now.getHours();


            const currentMinute =
                now.getMinutes();


            const [
                slotHour,
                slotMinute
            ] =
                option.value
                    .split(":")
                    .map(Number);


            const slotHasPassed =

                slotHour < currentHour ||

                (

                    slotHour ===
                    currentHour &&

                    slotMinute <=
                    currentMinute

                );


            if (slotHasPassed) {

                option.disabled =
                    true;


                option.hidden =
                    true;

            }


            else {

                option.disabled =
                    false;


                option.hidden =
                    false;

            }

        });

    }



    /*
       Prevent manual selection of
       previous dates from date input.
    */

    if (appointmentDate) {

        appointmentDate.min =
            getTodayDateString();

    }



    /*
       When user manually changes
       the date input.
    */

    if (appointmentDate) {

        appointmentDate.addEventListener(
            "change",
            () => {


                const selectedDate =
                    appointmentDate.value;


                const todayString =
                    getTodayDateString();


                /*
                   If today's appointment hours
                   are already finished.
                */

                if (

                    selectedDate ===
                    todayString &&

                    isAppointmentHoursOver()

                ) {

                    alert(
                        "Appointments for today are closed. Please select another date."
                    );


                    appointmentDate.value =
                        "";


                    appointmentTime.value =
                        "";


                    return;

                }


                updateAvailableTimeSlots();

            }
        );

    }



    /*
       Booked dates from MongoDB.

       Example:

       [
           {
               _id: "2026-09-10",
               count: 3
           }
       ]
    */

    let bookedDates = [];


    let currentDate =
        new Date();



    /* =====================================================
       LOAD BOOKED DATES FROM BACKEND
    ===================================================== */

    async function loadBookedDates() {

        try {

            const response =
                await fetch(
                    "https://healthynutrition.onrender.com/api/appointments/booked-dates"
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(

                    data.message ||

                    "Unable to load booked dates."

                );

                return;

            }


            bookedDates =
                data.bookedDates || [];


            console.log(
                "Booked dates loaded:",
                bookedDates
            );


            renderCalendar();

        }


        catch (error) {

            console.error(
                "Error loading booked dates:",
                error
            );

        }

    }



    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(
        year,
        month,
        day
    ) {

        const monthNumber =
            String(
                month + 1
            ).padStart(2, "0");


        const dayNumber =
            String(day).padStart(2, "0");


        return (
            `${year}-${monthNumber}-${dayNumber}`
        );

    }



    /* =====================================================
       CHECK PAST DATE

       Also prevents selecting today
       when appointment hours are over.
    ===================================================== */

    function isPastDate(
        year,
        month,
        day
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        /*
           Previous dates.
        */

        if (date < today) {

            return true;

        }


        /*
           Check if this calendar day
           is today.
        */

        const isToday =

            date.getFullYear() ===
            today.getFullYear() &&

            date.getMonth() ===
            today.getMonth() &&

            date.getDate() ===
            today.getDate();



        /*
           If today's appointment hours
           have ended, disable today.
        */

        if (

            isToday &&

            isAppointmentHoursOver()

        ) {

            return true;

        }


        return false;

    }



    /* =====================================================
       RENDER CALENDAR
    ===================================================== */

    function renderCalendar() {

        if (

            !calendarDays ||

            !calendarMonth

        ) {

            return;

        }


        calendarDays.innerHTML =
            "";


        const year =
            currentDate.getFullYear();


        const month =
            currentDate.getMonth();


        const monthName =
            currentDate.toLocaleString(
                "default",
                {
                    month: "long"
                }
            );


        calendarMonth.textContent =
            `${monthName} ${year}`;


        const firstDay =
            new Date(
                year,
                month,
                1
            ).getDay();


        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();



        /* ===============================================
           EMPTY SPACES
        =============================================== */

        for (
            let i = 0;
            i < firstDay;
            i++
        ) {

            const emptyDay =
                document.createElement(
                    "div"
                );


            emptyDay.classList.add(
                "calendar-day",
                "empty"
            );


            calendarDays.appendChild(
                emptyDay
            );

        }



        /* ===============================================
           CREATE CALENDAR DAYS
        =============================================== */

        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const dayElement =
                document.createElement(
                    "div"
                );


            dayElement.classList.add(
                "calendar-day"
            );


            dayElement.textContent =
                day;


            const dateString =
                formatDate(
                    year,
                    month,
                    day
                );



            /* ===========================================
               BOOKING INFORMATION
            =========================================== */

            const bookingInfo =
                bookedDates.find(
                    (booking) =>
                        booking._id === dateString
                );



            /*
               Maximum 5 appointments.
            */

            const isFullyBooked =

                bookingInfo &&

                bookingInfo.count >= 5;



            /* ===========================================
               FULLY BOOKED
            =========================================== */

            if (isFullyBooked) {

                dayElement.classList.add(
                    "booked"
                );


                dayElement.title =
                    "This date is fully booked";

            }



            /* ===========================================
               PAST OR CLOSED DATE
            =========================================== */

            if (

                isPastDate(
                    year,
                    month,
                    day
                )

            ) {

                dayElement.classList.add(
                    "past"
                );


                /*
                   Different message
                   for today after hours.
                */

                const todayString =
                    getTodayDateString();


                if (
                    dateString === todayString
                ) {

                    dayElement.title =
                        "Appointments for today are closed";

                }


                else {

                    dayElement.title =
                        "Past dates cannot be selected";

                }

            }



            /* ===========================================
               TODAY
            =========================================== */

            const today =
                new Date();


            if (

                day === today.getDate() &&

                month === today.getMonth() &&

                year === today.getFullYear()

            ) {

                dayElement.classList.add(
                    "today"
                );

            }



            /* ===========================================
               SELECT AVAILABLE DATE
            =========================================== */

            if (

                !isFullyBooked &&

                !isPastDate(
                    year,
                    month,
                    day
                )

            ) {

                dayElement.addEventListener(
                    "click",
                    () => {


                        /*
                           Remove previous selected date.
                        */

                        document
                            .querySelectorAll(
                                ".calendar-day.selected"
                            )
                            .forEach(
                                (element) => {

                                    element.classList.remove(
                                        "selected"
                                    );

                                }
                            );



                        /*
                           Highlight selected date.
                        */

                        dayElement.classList.add(
                            "selected"
                        );



                        /*
                           Put date in form.
                        */

                        if (appointmentDate) {

                            appointmentDate.value =
                                dateString;

                        }



                        /*
                           IMPORTANT:

                           Update available
                           time slots.
                        */

                        updateAvailableTimeSlots();



                        /*
                           Display readable date.
                        */

                        if (selectedDateText) {

                            const readableDate =
                                new Date(
                                    year,
                                    month,
                                    day
                                ).toLocaleDateString(
                                    "en-US",
                                    {

                                        weekday:
                                            "long",

                                        year:
                                            "numeric",

                                        month:
                                            "long",

                                        day:
                                            "numeric"

                                    }
                                );


                            selectedDateText.textContent =
                                readableDate;

                        }

                    }
                );

            }


            calendarDays.appendChild(
                dayElement
            );

        }

    }



    /* =====================================================
       PREVIOUS MONTH
    ===================================================== */

    if (prevMonth) {

        prevMonth.addEventListener(
            "click",
            () => {

                currentDate.setMonth(
                    currentDate.getMonth() - 1
                );


                renderCalendar();

            }
        );

    }



    /* =====================================================
       NEXT MONTH
    ===================================================== */

    if (nextMonth) {

        nextMonth.addEventListener(
            "click",
            () => {

                currentDate.setMonth(
                    currentDate.getMonth() + 1
                );


                renderCalendar();

            }
        );

    }



    /*
       Load bookings when page opens.
    */

    loadBookedDates();



    /* =====================================================
       17. APPOINTMENT FORM SUBMISSION
    ===================================================== */

    const appointmentForm =
        document.getElementById(
            "appointmentForm"
        );


    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            async function (event) {


                /*
                   Prevent page refresh.
                */

                event.preventDefault();


                console.log(
                    "APPOINTMENT FORM SUBMITTED"
                );



                /* =========================================
                   GET FORM VALUES
                ========================================= */

                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const appointmentType =
                    document
                        .getElementById(
                            "appointmentType"
                        )
                        .value;


                const selectedAppointmentDate =
                    document
                        .getElementById(
                            "appointmentDate"
                        )
                        .value;


                const selectedAppointmentTime =
                    document
                        .getElementById(
                            "appointmentTime"
                        )
                        .value;


                const selectedMode =
                    document.querySelector(
                        'input[name="mode"]:checked'
                    );


                const mode =
                    selectedMode
                        ? selectedMode.value
                        : "";


                const reason =
                    document
                        .getElementById("reason")
                        .value
                        .trim();



                /* =========================================
                   VALIDATION
                ========================================= */

                if (

                    !phone ||

                    !appointmentType ||

                    !selectedAppointmentDate ||

                    !selectedAppointmentTime ||

                    !mode

                ) {

                    alert(
                        "Please fill in all required appointment details."
                    );

                    return;

                }



                /* =========================================
                   CHECK TODAY'S APPOINTMENT TIME
                ========================================= */

                const todayString =
                    getTodayDateString();


                if (

                    selectedAppointmentDate ===
                    todayString

                ) {

                    /*
                       If appointment hours
                       are completely over.
                    */

                    if (
                        isAppointmentHoursOver()
                    ) {

                        alert(
                            "Appointments for today are already closed. Please select another date."
                        );

                        return;

                    }


                    /*
                       Check selected slot.
                    */

                    const [
                        selectedHour,
                        selectedMinute
                    ] =
                        selectedAppointmentTime
                            .split(":")
                            .map(Number);


                    const selectedTime =
                        new Date();


                    selectedTime.setHours(
                        selectedHour,
                        selectedMinute,
                        0,
                        0
                    );


                    const now =
                        new Date();


                    if (
                        selectedTime <= now
                    ) {

                        alert(
                            "This appointment time has already passed. Please select another available time."
                        );

                        return;

                    }

                }



                /* =========================================
                   CHECK LOGIN TOKEN
                ========================================= */

                const token =
                    localStorage.getItem(
                        "token"
                    );


                if (!token) {

                    alert(
                        "Please log in before booking an appointment."
                    );

                    return;

                }



                /* =========================================
                   CREATE APPOINTMENT DATA
                ========================================= */

                const appointmentData = {

                    phone:
                        phone,

                    appointmentType:
                        appointmentType,

                    appointmentDate:
                        selectedAppointmentDate,

                    appointmentTime:
                        selectedAppointmentTime,

                    mode:
                        mode,

                    reason:
                        reason

                };


                console.log(
                    "Appointment data:",
                    appointmentData
                );



                /* =========================================
                   GET BOOK BUTTON
                ========================================= */

                const bookButton =
                    appointmentForm.querySelector(
                        ".book-btn"
                    );


                if (bookButton) {

                    bookButton.disabled =
                        true;


                    bookButton.textContent =
                        "Preparing Payment...";

                }



                try {


                    /* =====================================
                       STEP 1
                       CREATE RAZORPAY ORDER
                    ===================================== */

                    const paymentResponse =
                        await fetch(
                            "https://healthynutrition.onrender.com/api/payment/create-order",
                            {

                                method:
                                    "POST",


                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${token}`

                                },


                                body:
                                    JSON.stringify({

                                        amount:
                                            500

                                    })

                            }
                        );


                    const paymentData =
                        await paymentResponse.json();



                    if (!paymentResponse.ok) {

                        throw new Error(

                            paymentData.message ||

                            "Unable to create payment order."

                        );

                    }


                    console.log(
                        "Razorpay order:",
                        paymentData
                    );



                    /* =====================================
                       STEP 2
                       RAZORPAY OPTIONS
                    ===================================== */

                    const options = {


                        key:
                            paymentData.key,


                        amount:
                            paymentData.order.amount,


                        currency:
                            paymentData.order.currency,


                        name:
                            "HealthyNutrition",


                        description:
                            "Nutrition Consultation Appointment",


                        order_id:
                            paymentData.order.id,


                        /* =================================
                           PAYMENT SUCCESS
                        ================================= */

                        handler:
                            async function (
                                paymentResult
                            ) {


                                console.log(
                                    "Payment successful:",
                                    paymentResult
                                );


                                /*
                                   Change button text.
                                */

                                if (bookButton) {

                                    bookButton.textContent =
                                        "Booking Appointment...";

                                }


                                try {


                                    /* =====================
                                       STEP 3
                                       SAVE APPOINTMENT
                                    ===================== */

                                    const response =
                                        await fetch(
                                            "https://healthynutrition.onrender.com/api/appointments",
                                            {

                                                method:
                                                    "POST",


                                                headers: {

                                                    "Content-Type":
                                                        "application/json",


                                                    "Authorization":
                                                        `Bearer ${token}`

                                                },


                                                body:
                                                    JSON.stringify(
                                                        appointmentData
                                                    )

                                            }
                                        );


                                    const data =
                                        await response.json();


                                    console.log(
                                        "Appointment response:",
                                        data
                                    );


                                    if (!response.ok) {

                                        alert(

                                            data.message ||

                                            "Payment was successful, but appointment booking failed."

                                        );

                                        return;

                                    }



                                    /* =====================
                                       SUCCESS
                                    ===================== */

                                    alert(
                                        "Payment successful! Your appointment has been booked."
                                    );


                                    console.log(

                                        "Appointment saved in MongoDB:",

                                        data.appointment

                                    );



                                    /*
                                       Reset form.
                                    */

                                    appointmentForm.reset();



                                    /*
                                       Clear appointment date.
                                    */

                                    if (appointmentDate) {

                                        appointmentDate.value =
                                            "";

                                    }



                                    /*
                                       Clear appointment time.
                                    */

                                    if (appointmentTime) {

                                        appointmentTime.value =
                                            "";

                                    }



                                    /*
                                       Clear selected date text.
                                    */

                                    if (selectedDateText) {

                                        selectedDateText.textContent =
                                            "Please select a date";

                                    }



                                    /*
                                       Remove calendar selection.
                                    */

                                    document
                                        .querySelectorAll(
                                            ".calendar-day.selected"
                                        )
                                        .forEach(
                                            (element) => {

                                                element.classList.remove(
                                                    "selected"
                                                );

                                            }
                                        );



                                    /*
                                       Reload calendar.
                                    */

                                    await loadBookedDates();


                                }


                                catch (error) {

                                    console.error(
                                        "Appointment booking error:",
                                        error
                                    );


                                    alert(
                                        "Payment was successful, but there was an error saving your appointment."
                                    );

                                }


                                finally {

                                    if (bookButton) {

                                        bookButton.disabled =
                                            false;


                                        bookButton.textContent =
                                            "Book Appointment";

                                    }

                                }

                            },


                        /* =================================
                           PREFILL DETAILS
                        ================================= */

                        prefill: {

                            name:
                                "",


                            contact:
                                phone

                        },


                        /* =================================
                           THEME
                        ================================= */

                        theme: {

                            color:
                                "#2E8B57"

                        },


                        /* =================================
                           PAYMENT POPUP CLOSED
                        ================================= */

                        modal: {

                            ondismiss:
                                function () {

                                    console.log(
                                        "Payment popup closed"
                                    );


                                    if (bookButton) {

                                        bookButton.disabled =
                                            false;


                                        bookButton.textContent =
                                            "Book Appointment";

                                    }

                                }

                        }

                    };



                    /* =====================================
                       STEP 3
                       OPEN RAZORPAY POPUP
                    ===================================== */

                    const razorpayCheckout =
                        new Razorpay(
                            options
                        );


                    razorpayCheckout.open();


                }


                catch (error) {

                    console.error(
                        "Payment error:",
                        error
                    );


                    alert(

                        error.message ||

                        "Unable to start payment. Please try again."

                    );


                    if (bookButton) {

                        bookButton.disabled =
                            false;


                        bookButton.textContent =
                            "Book Appointment";

                    }

                }

            }
        );

    }



    /* =====================================================
       18. GLOBAL HEALTHYNUTRITION OBJECT
    ===================================================== */

    window.HealthyNutrition = {

        showNutritionCard:
            showNutritionCard,


        renderCalendar:
            renderCalendar,


        loadBookedDates:
            loadBookedDates,


        mealPlans:
            mealPlans,


        updateAvailableTimeSlots:
            updateAvailableTimeSlots

    };


});