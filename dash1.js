/* =========================================================
   HEALTHYNUTRITION
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    // ==============================
    // AUTHENTICATION CHECK
    // ==============================

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/protected",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("loggedIn");

            window.location.href = "login.html";

            return;
        }

      const data = await response.json();
const loggedInUser = data.user;

console.log("Authenticated user:", loggedInUser);
// Update user's name on the dashboard
const userNameElements = document.querySelectorAll(
    "#userName, .user-name"
);

userNameElements.forEach(element => {
    element.textContent = loggedInUser.name;
});
// Update profile picture with user's first initial
const profilePicture = document.getElementById("profilePicture");

if (profilePicture && loggedInUser.name) {
    profilePicture.textContent =
        loggedInUser.name.charAt(0).toUpperCase();
}

    } catch (error) {

        console.error(
            "Authentication check failed:",
            error
        );

        alert(
            "Unable to connect to the server. " +
            "Please make sure the backend is running."
        );

        return;
    }


    /* =====================================================
       1. NUTRITION CAROUSEL
    ===================================================== */

    const nutritionCards =
        document.querySelectorAll(".nutrition-card");

    const nutritionSlider =
        document.querySelector(".nutrition-slider");


    let currentCard = 0;

    /*
        HOW LONG THE CENTER CARD STAYS

        2000 = 2 seconds
        3000 = 3 seconds
        5000 = 5 seconds
    */

    const cardStayTime = 2000;


    /*
        How long the CSS transition takes.

        Your CSS currently uses:
        transform .75s
        opacity .65s

        So we let CSS handle the actual movement.
    */


    function clearCarouselClasses(card) {

        card.classList.remove(
            "active",
            "prev",
            "next",
            "hidden-left",
            "hidden-right"
        );

    }


    function updateNutritionCarousel() {

        const totalCards =
            nutritionCards.length;


        if (totalCards === 0) {
            return;
        }


        nutritionCards.forEach(
            (card, index) => {

                clearCarouselClasses(card);


                /*
                    Calculate where this card is
                    relative to the center card.
                */

                let position =
                    index - currentCard;


                /*
                    Make the carousel circular.

                    Example:

                    Card 1
                    Card 2
                    Card 3
                    Card 4
                    Card 5

                    After Card 5,
                    Card 1 becomes next.
                */

                if (
                    position >
                    totalCards / 2
                ) {

                    position -= totalCards;

                }


                if (
                    position <
                    -totalCards / 2
                ) {

                    position += totalCards;

                }


                /*
                    CENTER
                */

                if (position === 0) {

                    card.classList.add("active");

                }


                /*
                    LEFT
                */

                else if (position === -1) {

                    card.classList.add("prev");

                }


                /*
                    RIGHT
                */

                else if (position === 1) {

                    card.classList.add("next");

                }


                /*
                    FAR LEFT
                */

                else if (position < 0) {

                    card.classList.add(
                        "hidden-left"
                    );

                }


                /*
                    FAR RIGHT
                */

                else {

                    card.classList.add(
                        "hidden-right"
                    );

                }

            }
        );

    }


    /*
        NEXT CARD
    */

    function nextNutritionCard() {

        currentCard++;

        if (
            currentCard >=
            nutritionCards.length
        ) {

            currentCard = 0;

        }

        updateNutritionCarousel();

    }


    /*
        PREVIOUS CARD
    */

    function previousNutritionCard() {

        currentCard--;

        if (currentCard < 0) {

            currentCard =
                nutritionCards.length - 1;

        }

        updateNutritionCarousel();

    }


    /*
        INITIALIZE CAROUSEL
    */

    updateNutritionCarousel();


    /*
        AUTOMATIC MOVEMENT

        Center card stays for 2 seconds,
        then moves to the next card.
    */

    let carouselTimer =
        setInterval(
            nextNutritionCard,
            cardStayTime
        );


    /*
        PAUSE WHEN USER HOVERS
    */

    if (nutritionSlider) {
        nutritionSlider.addEventListener(
            "mouseenter",
            () => {

            clearInterval(
                    carouselTimer
                );

            }
        );
        // server to connect to backend


        nutritionSlider.addEventListener(
            "mouseleave",
            () => {
                clearInterval(
                    carouselTimer
                );


                carouselTimer =
                    setInterval(
                        nextNutritionCard,
                        cardStayTime
                    );

            }
        );

    }


    /*
        CLICKING THE LEFT CARD
        MOVES BACK
    */

    nutritionCards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    if (
                        card.classList.contains(
                            "prev"
                        )
                    ) {

                        previousNutritionCard();

                    }


                    if (
                        card.classList.contains(
                            "next"
                        )
                    ) {

                        nextNutritionCard();

                    }

                }
            );

        }
    );



    /* =====================================================
       2. SIDEBAR NAVIGATION
    ===================================================== */

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(
        (item) => {

            item.addEventListener(
                "click",
                (event) => {

                    /*
                        If the navigation item has
                        a real link, allow it to work.
                    */

                    const href =
                        item.getAttribute("href");


                    /*
                        If it is only a dashboard
                        button, change active state.
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        event.preventDefault();

                    }


                    navItems.forEach(
                        (nav) => {

                            nav.classList.remove(
                                "active"
                            );

                        }
                    );


                    item.classList.add(
                        "active"
                    );

                }
            );

        }
    );



    /* =====================================================
       3. NOTIFICATION BUTTON
    ===================================================== */

    const notificationButton =
        document.querySelector(
            ".notification-button"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                /*
                    Remove notification dot
                    after clicking.
                */

                const dot =
                    document.querySelector(
                        ".notification-dot"
                    );


                if (dot) {

                    dot.style.display =
                        "none";

                }


                /*
                    Small visual feedback.
                */

                notificationButton.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },

                        {
                            transform:
                                "scale(.9)"
                        },

                        {
                            transform:
                                "scale(1)"
                        }
                    ],
                    {
                        duration: 250
                    }
                );

            }
        );

    }



    /* =====================================================
       4. PROFILE BUTTON / PROFILE AREA
    ===================================================== */

    const profile =
        document.querySelector(
            ".profile"
        );


    if (profile) {

        profile.addEventListener(
            "click",
            () => {

                profile.classList.toggle(
                    "profile-open"
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


    mealRows.forEach(
        (meal) => {

            meal.addEventListener(
                "click",
                () => {

                    meal.classList.toggle(
                        "completed"
                    );

                }
            );

        }
    );



    /* =====================================================
       6. SOFT BUTTONS
    ===================================================== */

    const softButtons =
        document.querySelectorAll(
            ".soft-button"
        );


    softButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "button-clicked"
                    );

                }
            );

        }
    );



    /* =====================================================
       7. EXPERT BUTTON
    ===================================================== */

    const expertButton =
        document.querySelector(
            ".expert-button"
        );


    if (expertButton) {

        expertButton.addEventListener(
            "click",
            () => {

                alert(
                    "Your nutrition consultation feature will be available soon."
                );

            }
        );

    }



    /* =====================================================
       8. REMINDER INTERACTION
    ===================================================== */

    const reminderItems =
        document.querySelectorAll(
            ".reminder-item"
        );


    reminderItems.forEach(
        (item) => {

            item.addEventListener(
                "click",
                () => {

                    item.classList.toggle(
                        "completed"
                    );

                }
            );

        }
    );



    /* =====================================================
       9. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                function (event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.classList.add(
                        "button-ripple"
                    );


                    const rect =
                        button.getBoundingClientRect();


                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left
                        ) + "px";


                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top
                        ) + "px";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );



    /* =====================================================
       10. UPDATE NUTRITION DATA
       
       THIS PART IS READY FOR FUTURE
       PERSONALIZED NUTRITION.
    ===================================================== */

    function updateNutritionData(data) {


        /*
            Example:

            updateNutritionData({
                protein: "50g",
                carbs: "220g",
                water: "2.5L",
                fats: "65g",
                fiber: "30g"
            });
        */


        if (
            data.protein !== undefined
        ) {

            const proteinValue =
                document.querySelector(
                    ".protein h3"
                );


            if (proteinValue) {

                proteinValue.innerHTML =
                    `${data.protein}<small> / day</small>`;

            }

        }


        if (
            data.carbs !== undefined
        ) {

            const carbsValue =
                document.querySelector(
                    ".carbs h3"
                );


            if (carbsValue) {

                carbsValue.innerHTML =
                    `${data.carbs}<small> / day</small>`;

            }

        }


        if (
            data.water !== undefined
        ) {

            const waterValue =
                document.querySelector(
                    ".water h3"
                );


            if (waterValue) {

                waterValue.innerHTML =
                    `${data.water}<small> / day</small>`;

            }

        }


        if (
            data.fats !== undefined
        ) {

            const fatsValue =
                document.querySelector(
                    ".fats h3"
                );


            if (fatsValue) {

                fatsValue.innerHTML =
                    `${data.fats}<small> / day</small>`;

            }

        }


        if (
            data.fiber !== undefined
        ) {

            const fiberValue =
                document.querySelector(
                    ".fiber h3"
                );


            if (fiberValue) {

                fiberValue.innerHTML =
                    `${data.fiber}<small> / day</small>`;

            }

        }

    }


/* =====================================================
   TODAY'S MEALS
   TEMPORARY PERSONALIZED DATA
===================================================== */

const mealPlans = {

    "client-001": {
        breakfast: {
            icon: "🌅",
            food: "Oatmeal & fruits",
            time: "8:00 AM"
        },

        lunch: {
            icon: "🥗",
            food: "Rice, vegetables & chicken",
            time: "1:00 PM"
        },

        snack: {
            icon: "🍎",
            food: "Fruits & yogurt",
            time: "4:30 PM"
        },

        dinner: {
            icon: "🌙",
            food: "Balanced protein meal",
            time: "8:00 PM"
        }
    },


    "client-002": {
        breakfast: {
            icon: "🥚",
            food: "Eggs, toast & banana",
            time: "7:30 AM"
        },

        lunch: {
            icon: "🍚",
            food: "Rice, dal & vegetables",
            time: "12:30 PM"
        },

        snack: {
            icon: "🥛",
            food: "Milk, nuts & fruit",
            time: "4:00 PM"
        },

        dinner: {
            icon: "🍗",
            food: "Chicken, vegetables & rice",
            time: "7:30 PM"
        }
    }

};


function updateTodaysMeals(mealPlan) {

    if (!mealPlan) {
        return;
    }

    const mealRows =
        document.querySelectorAll(".meal-row");


    const meals = [
        mealPlan.breakfast,
        mealPlan.lunch,
        mealPlan.snack,
        mealPlan.dinner
    ];


    mealRows.forEach((row, index) => {

        const meal = meals[index];

        if (!meal) {
            return;
        }


        // Change icon

        const icon =
            row.querySelector(".meal-icon");

        if (icon) {
            icon.textContent = meal.icon;
        }


        // Change food description

        const food =
            row.querySelector("small");

        if (food) {
            food.textContent = meal.food;
        }


        // Change time

        const time =
            row.querySelector("time");

        if (time) {
            time.textContent = meal.time;
        }

    });

}


/*
    TEMPORARY CLIENT ID

    This is ONLY for testing.

    Later this will come from
    your backend after login.
*/

const clientId =
    localStorage.getItem("clientId") || "client-001";


const clientMealPlan =
    mealPlans[clientId];


updateTodaysMeals(clientMealPlan);
    /* =====================================================
       11. EXAMPLE PERSONALIZED DATA
       
       COMMENTED OUT FOR NOW.

       When you have your calculation system,
       this can receive the calculated values.
    ===================================================== */

    /*
    updateNutritionData({

        protein: "50g",

        carbs: "220g",

        water: "2.5L",

        fats: "65g",

        fiber: "30g"

    });
    */



    /* =====================================================
       12. PROGRESS BAR UPDATE
    ===================================================== */

    function updateProgress(
        type,
        percentage
    ) {

        const card =
            document.querySelector(
                `.${type}`
            );


        if (!card) {
            return;
        }


        const progress =
            card.querySelector(
                ".mini-progress span"
            );


        if (!progress) {
            return;
        }


        /*
            Keep percentage between
            0 and 100.
        */

        percentage =
            Math.max(
                0,
                Math.min(
                    100,
                    percentage
                )
            );


        progress.style.width =
            `${percentage}%`;

    }



    /* =====================================================
       13. CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.querySelector(
            "#current-year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       14. KEYBOARD CONTROLS
       
       LEFT ARROW  = previous
       RIGHT ARROW = next
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowRight"
            ) {

                nextNutritionCard();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousNutritionCard();

            }

        }
    );



    /* =====================================================
       15. TOUCH / SWIPE SUPPORT
       
       This lets the user swipe the carousel
       on mobile or touchscreen devices.
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (nutritionSlider) {

        nutritionSlider.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        nutritionSlider.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;


                const swipeDistance =
                    touchEndX -
                    touchStartX;


                /*
                    Swipe left
                */

                if (
                    swipeDistance < -50
                ) {

                    nextNutritionCard();

                }


                /*
                    Swipe right
                */

                else if (
                    swipeDistance > 50
                ) {

                    previousNutritionCard();

                }

            },
            {
                passive: true
            }
        );

    }
    


const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout = confirm(
            "Are you sure you want to log out?"
        );

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");

        window.location.href = "login.html";
    });
}
    /* =====================================================
       16. EXPOSE FUNCTIONS
       
       This lets you use them later from
       other JavaScript files if needed.
    ===================================================== */

    window.HealthyNutrition = {

        nextCard:
            nextNutritionCard,

        previousCard:
            previousNutritionCard,

        updateNutrition:
            updateNutritionData,

        updateProgress:
            updateProgress

    };


});