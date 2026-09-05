
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
            index = nutritionCards.length - 1;
        }

        if (index >= nutritionCards.length) {
            index = 0;
        }

        currentCard = index;

        nutritionCards.forEach((card, i) => {
            card.classList.remove("active", "previous", "next");

            if (i === currentCard) {
                card.classList.add("active");
            } else if (
                i ===
                (currentCard - 1 + nutritionCards.length) %
                    nutritionCards.length
            ) {
                card.classList.add("previous");
            } else if (
                i ===
                (currentCard + 1) % nutritionCards.length
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

        item.addEventListener("click", () => {

            navItems.forEach((nav) => {
                nav.classList.remove("active");
            });

            item.classList.add("active");
        });

    });


    /* =====================================================
       3. NOTIFICATION BUTTON
    ===================================================== */

    const notificationButton =
        document.querySelector(".notification-btn");

    if (notificationButton) {

        notificationButton.addEventListener("click", () => {
            console.log("Notifications clicked");
        });

    }


    /* =====================================================
       4. PROFILE AREA
    ===================================================== */

    const profileArea =
        document.querySelector(".profile-area");

    if (profileArea) {

        profileArea.addEventListener("click", () => {
            console.log("Profile clicked");
        });

    }


    /* =====================================================
       5. MEAL ROW INTERACTION
    ===================================================== */

    const mealRows =
        document.querySelectorAll(".meal-row");

    mealRows.forEach((row) => {

        row.addEventListener("click", () => {
            row.classList.toggle("completed");
        });

    });


    /* =====================================================
       6. SOFT BUTTONS
    ===================================================== */

    const softButtons =
        document.querySelectorAll(".soft-btn");

    softButtons.forEach((button) => {

        button.addEventListener("click", () => {
            console.log("Button clicked:", button.textContent.trim());
        });

    });


    /* =====================================================
       7. EXPERT BUTTON
    ===================================================== */

    const expertButton =
        document.querySelector(".expert-btn");

    if (expertButton) {

        expertButton.addEventListener("click", () => {
            console.log("Expert button clicked");
        });

    }


    /* =====================================================
       8. REMINDER INTERACTION
    ===================================================== */

    const reminder =
        document.querySelector(".reminder");

    if (reminder) {

        reminder.addEventListener("click", () => {
            reminder.classList.toggle("completed");
        });

    }


    /* =====================================================
       9. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach((button) => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            ripple.style.left =
                event.clientX - rect.left + "px";

            ripple.style.top =
                event.clientY - rect.top + "px";

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =====================================================
       10. UPDATE NUTRITION DATA
    ===================================================== */

    window.updateNutritionData = function (data) {

        if (!data) {
            return;
        }

        console.log("Nutrition data updated:", data);

    };


    /* =====================================================
       11. TEMPORARY MEAL PLANS
    ===================================================== */

    const mealPlans = {

        "client-001": {
            breakfast: "Oatmeal with banana",
            lunch: "Brown rice with chicken and vegetables",
            dinner: "Grilled fish with salad"
        },

        "client-002": {
            breakfast: "Eggs with whole wheat toast",
            lunch: "Rice with vegetables and chickpeas",
            dinner: "Chicken with vegetables"
        }

    };

    window.mealPlans = mealPlans;


    /* =====================================================
       12. PROGRESS BAR
    ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar");

    progressBars.forEach((bar) => {

        const value =
            bar.getAttribute("data-progress");

        if (value) {
            bar.style.width = value + "%";
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

    document.addEventListener("keydown", (event) => {

        if (!nutritionCards.length) {
            return;
        }

        if (event.key === "ArrowLeft") {
            showNutritionCard(currentCard - 1);
        }

        if (event.key === "ArrowRight") {
            showNutritionCard(currentCard + 1);
        }

    });


    /* =====================================================
       15. TOUCH / SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (nutritionSlider) {

        nutritionSlider.addEventListener("touchstart", (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        });

        nutritionSlider.addEventListener("touchend", (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;

            if (Math.abs(difference) < 50) {
                return;
            }

            if (difference > 0) {
                showNutritionCard(currentCard + 1);
            } else {
                showNutritionCard(currentCard - 1);
            }

        });

    }


    /* =====================================================
       16. APPOINTMENT CALENDAR
    ===================================================== */

    const calendarDays =
        document.getElementById("calendarDays");

    const calendarMonth =
        document.getElementById("calendarMonth");

    const selectedDateText =
        document.getElementById("selectedDateText");

    const appointmentDate =
        document.getElementById("appointmentDate");

    const prevMonth =
        document.getElementById("prevMonth");

    const nextMonth =
        document.getElementById("nextMonth");


    /*
       Temporary booked dates.

       These will later come from MongoDB.
    */

    const bookedDates = [
        "2026-08-05",
        "2026-08-08",
        "2026-08-12",
        "2026-08-15",
        "2026-08-20",
        "2026-08-24",
        "2026-08-27"
    ];


    let currentDate = new Date();


    function formatDate(year, month, day) {

        const monthNumber =
            String(month + 1).padStart(2, "0");

        const dayNumber =
            String(day).padStart(2, "0");

        return `${year}-${monthNumber}-${dayNumber}`;
    }


    function renderCalendar() {

        if (!calendarDays || !calendarMonth) {
            return;
        }

        calendarDays.innerHTML = "";

        const year =
            currentDate.getFullYear();

        const month =
            currentDate.getMonth();


        const monthName =
            currentDate.toLocaleString("default", {
                month: "long"
            });


        calendarMonth.textContent =
            `${monthName} ${year}`;


        const firstDay =
            new Date(year, month, 1).getDay();


        const daysInMonth =
            new Date(year, month + 1, 0).getDate();


        /*
           Empty spaces before the first day.
        */

        for (let i = 0; i < firstDay; i++) {

            const emptyDay =
                document.createElement("div");

            emptyDay.classList.add("calendar-day", "empty");

            calendarDays.appendChild(emptyDay);

        }


        /*
           Create each day.
        */

        for (let day = 1; day <= daysInMonth; day++) {

            const dayElement =
                document.createElement("div");

            dayElement.classList.add("calendar-day");

            dayElement.textContent = day;


            const dateString =
                formatDate(year, month, day);


            /*
               Check whether date is booked.
            */

            if (bookedDates.includes(dateString)) {

                dayElement.classList.add("booked");

                dayElement.title =
                    "This date is already booked";

            }


            /*
               Check today's date.
            */

            const today =
                new Date();


            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {

                dayElement.classList.add("today");

            }


            /*
               Select available date.
            */

            if (!bookedDates.includes(dateString)) {

                dayElement.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(".calendar-day")
                            .forEach((element) => {
                                element.classList.remove("selected");
                            });


                        dayElement.classList.add("selected");


                        if (appointmentDate) {
                            appointmentDate.value =
                                dateString;
                        }


                        if (selectedDateText) {

                            const readableDate =
                                new Date(
                                    year,
                                    month,
                                    day
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    }
                                );

                            selectedDateText.textContent =
                                `Selected date: ${readableDate}`;

                        }

                    }
                );

            }


            calendarDays.appendChild(dayElement);

        }

    }


    if (prevMonth) {

        prevMonth.addEventListener("click", () => {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            renderCalendar();

        });

    }


    if (nextMonth) {

        nextMonth.addEventListener("click", () => {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            renderCalendar();

        });

    }


    renderCalendar();


   /* =====================================================
   17. APPOINTMENT FORM SUBMISSION
===================================================== */

const appointmentForm =
    document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", async function (event) {

        // Prevent the page from refreshing
        event.preventDefault();

        console.log("APPOINTMENT FORM SUBMITTED");

        // Get form values
        const phone =
            document.getElementById("phone").value.trim();

        const appointmentType =
            document.getElementById("appointmentType").value;

        const appointmentDate =
            document.getElementById("appointmentDate").value;

        const appointmentTime =
            document.getElementById("appointmentTime").value;

        const selectedMode =
            document.querySelector(
                'input[name="mode"]:checked'
            );

        const mode =
            selectedMode ? selectedMode.value : "";

        const reason =
            document.getElementById("reason").value.trim();


        // Check required fields
        if (
            !phone ||
            !appointmentType ||
            !appointmentDate ||
            !appointmentTime ||
            !mode
        ) {
            alert(
                "Please fill in all required appointment details."
            );
            return;
        }


        // Get login token
        const token =
            localStorage.getItem("token");

        if (!token) {
            alert(
                "Please log in before booking an appointment."
            );
            return;
        }


        // Appointment data to send to backend
        const appointmentData = {
            phone: phone,
            appointmentType: appointmentType,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            mode: mode,
            reason: reason
        };


        console.log(
            "Sending appointment:",
            appointmentData
        );


        try {

            // Send appointment to Express backend
            const response = await fetch(
                "http://localhost:5000/api/appointments",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(appointmentData)
                }
            );


            // Read server response
            const data = await response.json();

            console.log(
                "Server response:",
                data
            );


            // Handle server error
            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to book appointment."
                );

                return;
            }


            // Appointment successfully saved
            alert(
                "Appointment booked successfully!"
            );

            console.log(
                "Appointment saved in MongoDB:",
                data.appointment
            );


            // Reset form
            appointmentForm.reset();


            // Clear selected date
            const dateInput =
                document.getElementById("appointmentDate");

            if (dateInput) {
                dateInput.value = "";
            }


            const selectedDateText =
                document.getElementById("selectedDateText");

            if (selectedDateText) {
                selectedDateText.textContent =
                    "Please select a date";
            }


        } catch (error) {

            console.error(
                "Appointment booking error:",
                error
            );

            alert(
                "Unable to connect to the server. " +
                "Please make sure the backend is running."
            );
        }

    });

}
    /* =====================================================
       18. GLOBAL HEALTHYNUTRITION OBJECT
    ===================================================== */

    window.HealthyNutrition = {

        showNutritionCard:
            showNutritionCard,

        renderCalendar:
            renderCalendar,

        mealPlans:
            mealPlans

    };


});