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

                    nav.classList.remove(
                        "active"
                    );

                });


                item.classList.add(
                    "active"
                );

            }
        );

    });



    /* =====================================================
       3. NOTIFICATION BUTTON
    ===================================================== */

    const notificationButton =
        document.querySelector(
            ".notification-btn"
        );


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
        document.querySelector(
            ".profile-area"
        );


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
        document.querySelectorAll(
            ".meal-row"
        );


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
        document.querySelectorAll(
            ".soft-btn"
        );


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
        document.querySelector(
            ".expert-btn"
        );


    if (expertButton) {

        expertButton.addEventListener(
            "click",
            () => {

                console.log(
                    "Expert button clicked"
                );

            }
        );

    }



    /* =====================================================
       8. REMINDER INTERACTION
    ===================================================== */

    const reminder =
        document.querySelector(
            ".reminder"
        );


    if (reminder) {

        reminder.addEventListener(
            "click",
            () => {

                reminder.classList.toggle(
                    "completed"
                );

            }
        );

    }



    /* =====================================================
       9. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "ripple"
                );


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


                button.appendChild(
                    ripple
                );


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
        document.querySelectorAll(
            ".progress-bar"
        );


    progressBars.forEach((bar) => {

        const value =
            bar.getAttribute(
                "data-progress"
            );


        if (value) {

            bar.style.width =
                value + "%";

        }

    });



    /* =====================================================
       13. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


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


    const prevMonth =
        document.getElementById(
            "prevMonth"
        );


    const nextMonth =
        document.getElementById(
            "nextMonth"
        );


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
                    "http://localhost:5000/api/appointments/booked-dates"
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


        return date < today;

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
           EMPTY SPACES BEFORE FIRST DAY
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
           CREATE DAYS
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
               FIND BOOKING INFORMATION
            =========================================== */

            const bookingInfo =
                bookedDates.find(
                    (booking) =>
                        booking._id === dateString
                );



            /*
               Check if the date has reached
               maximum booking capacity.

               Maximum = 5 people.
            */

            const isFullyBooked =
                bookingInfo &&
                bookingInfo.count >= 5;



            /* ===========================================
               FULLY BOOKED DATE
            =========================================== */

            if (isFullyBooked) {

                dayElement.classList.add(
                    "booked"
                );


                dayElement.title =
                    "This date is fully booked";

            }



            /* ===========================================
               PAST DATE
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


                dayElement.title =
                    "Past dates cannot be selected";

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
                           Put date inside appointment form.
                        */

                        if (appointmentDate) {

                            appointmentDate.value =
                                dateString;

                        }



                        /*
                           Display readable selected date.
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
       Load booking information from MongoDB
       when page opens.
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


                const appointmentTime =
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

                    !appointmentTime ||

                    !mode

                ) {

                    alert(
                        "Please fill in all required appointment details."
                    );

                    return;

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
                        appointmentTime,

                    mode:
                        mode,

                    reason:
                        reason

                };


                console.log(
                    "Sending appointment:",
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
                        "Booking...";

                }



                try {


                    /* =====================================
                       SEND TO EXPRESS BACKEND
                    ===================================== */

                    const response =
                        await fetch(
                            "http://localhost:5000/api/appointments",
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
                        "Server response:",
                        data
                    );



                    /* =====================================
                       HANDLE ERROR
                    ===================================== */

                    if (!response.ok) {

                        alert(

                            data.message ||

                            "Failed to book appointment."

                        );

                        return;

                    }



                    /* =====================================
                       SUCCESS
                    ===================================== */

                    alert(
                        "Appointment booked successfully!"
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
                       Clear selected date display.
                    */

                    if (appointmentDate) {

                        appointmentDate.value =
                            "";

                    }


                    if (selectedDateText) {

                        selectedDateText.textContent =
                            "Please select a date";

                    }



                    /*
                       Remove selected calendar date.
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
                       Reload booked dates from MongoDB.

                       This updates the calendar immediately
                       after a successful booking.
                    */

                    await loadBookedDates();


                }


                catch (error) {

                    console.error(
                        "Appointment booking error:",
                        error
                    );


                    alert(

                        "Unable to connect to the server. " +

                        "Please make sure the backend is running."

                    );

                }


                finally {


                    /*
                       Restore booking button.
                    */

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
            mealPlans

    };


});