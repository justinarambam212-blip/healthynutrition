/* =========================================================
   SETTINGS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const settingsForm = document.getElementById("settingsForm");

    const profilePhoto = document.getElementById("profilePhoto");
    const profilePreview = document.getElementById("profilePreview");
    const defaultAvatar = document.getElementById("defaultAvatar");

    const saveButton = document.querySelector(".save-button");

    // =====================================================
    // BACKEND API
    // =====================================================

    const API_URL = "https://healthynutrition.onrender.com/api/auth/profile";


    // =====================================================
    // CHECK LOGIN
    // =====================================================

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }


    // =====================================================
    // LOAD USER DATA
    // =====================================================

    loadUserData();


    async function loadUserData() {

        try {

            const response = await fetch(API_URL, {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });


            if (response.status === 401) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "login.html";

                return;
            }


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message || "Unable to load profile."
                );
            }


            const user = result.user || result;

            fillUserData(user);


        } catch (error) {

            console.error(
                "Error loading user data:",
                error
            );

            alert(
                "Unable to load your profile. Please try again."
            );
        }
    }


    // =====================================================
    // FILL FORM WITH USER DATA
    // =====================================================

    function fillUserData(user) {

        if (!user) return;


        // BASIC INFORMATION

        setValue(
            "fullName",
            user.name || ""
        );

        setValue(
            "email",
            user.email || ""
        );

        setValue(
            "phone",
            user.phone || ""
        );


        // DATE OF BIRTH

        setValue(
            "dob",
            user.dateOfBirth || ""
        );


        // PERSONAL DETAILS

        setValue(
            "gender",
            user.gender || ""
        );

        setValue(
            "bloodGroup",
            user.bloodGroup || ""
        );

        setValue(
            "occupation",
            user.occupation || ""
        );

        setValue(
            "address",
            user.address || ""
        );


        // BODY DETAILS

        setValue(
            "height",
            user.height ?? ""
        );

        setValue(
            "weight",
            user.weight ?? ""
        );


        // TEXT FIELDS

        setValue(
            "allergyDetails",
            user.allergyDetails || ""
        );

        setValue(
            "typicalMealtimes",
            user.typicalMealtimes || ""
        );

        setValue(
            "weightChangeKg",
            user.weightChangeKg ?? ""
        );

        setValue(
            "alcoholDetails",
            user.alcoholDetails || ""
        );

        setValue(
            "gymTiming",
            user.gymTiming || ""
        );

        setValue(
            "supplementDetails",
            user.supplementDetails || ""
        );

        setValue(
            "chiefComplaint",
            user.chiefComplaint || ""
        );

        setValue(
            "diet",
            user.diet || ""
        );


        // RADIO / SELECT VALUES

        setRadioValue(
            "maritalStatus",
            user.maritalStatus
        );

        setRadioValue(
            "gender",
            user.gender
        );

        setRadioValue(
            "lifestyle",
            user.lifestyle
        );

        setRadioValue(
            "foodHabits",
            user.foodHabits
        );

        setRadioValue(
            "vegetarianType",
            user.vegetarianType
        );

        setRadioValue(
            "meatFrequency",
            user.meatFrequency
        );

        setRadioValue(
            "lactoseIntolerant",
            user.lactoseIntolerant
        );

        setRadioValue(
            "hasFoodAllergies",
            user.hasFoodAllergies
        );

        setRadioValue(
            "mealSystem",
            user.mealSystem
        );

        setRadioValue(
            "weightChange",
            user.weightChange
        );

        setRadioValue(
            "alcoholConsumption",
            user.alcoholConsumption
        );

        setRadioValue(
            "gymGoer",
            user.gymGoer
        );

        setRadioValue(
            "supplementUse",
            user.supplementUse
        );

        setRadioValue(
            "consultationPreference",
            user.consultationPreference
        );


        // PROFILE PHOTO

        if (user.profilePicture) {

            showProfilePhoto(
                user.profilePicture
            );
        }
    }


    // =====================================================
    // SET NORMAL INPUT / SELECT VALUE
    // =====================================================

    function setValue(id, value) {

        const element =
            document.getElementById(id);

        if (
            element &&
            value !== undefined &&
            value !== null
        ) {

            element.value = value;
        }
    }


    // =====================================================
    // SET RADIO VALUE
    // =====================================================

    function setRadioValue(name, value) {

        if (!value) return;


        const radio =
            document.querySelector(
                `input[name="${name}"][value="${value}"]`
            );


        if (radio) {

            radio.checked = true;

        } else {

            // Also support select elements

            const select =
                document.querySelector(
                    `select[name="${name}"]`
                );

            if (select) {
                select.value = value;
            }
        }
    }


    // =====================================================
    // PROFILE PHOTO PREVIEW
    // =====================================================

    if (profilePhoto) {

        profilePhoto.addEventListener(
            "change",
            () => {

                const file =
                    profilePhoto.files[0];

                if (!file) return;


                if (
                    !file.type.startsWith("image/")
                ) {

                    alert(
                        "Please select a valid image file."
                    );

                    profilePhoto.value = "";

                    return;
                }


                if (
                    file.size > 5 * 1024 * 1024
                ) {

                    alert(
                        "Profile photo must be less than 5 MB."
                    );

                    profilePhoto.value = "";

                    return;
                }


                const reader =
                    new FileReader();


                reader.onload = function(event) {

                    showProfilePhoto(
                        event.target.result
                    );
                };


                reader.readAsDataURL(file);
            }
        );
    }


    function showProfilePhoto(imageSource) {

        if (!profilePreview) return;

        profilePreview.src = imageSource;

        profilePreview.classList.add(
            "active"
        );


        if (defaultAvatar) {

            defaultAvatar.classList.add(
                "hidden"
            );
        }
    }


    // =====================================================
    // FORM SUBMISSION
    // =====================================================

    settingsForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!validateForm()) {
                return;
            }


            const originalButtonText =
                saveButton.innerHTML;


            saveButton.disabled = true;

            saveButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Saving...
            `;


            // =================================================
            // COLLECT FORM DATA
            // =================================================

            const formData =
                new FormData(settingsForm);


            // =================================================
            // CONVERT FORM DATA TO JSON
            // =================================================

            const profileData = {

                name:
                    formData.get("fullName") || "",

                email:
                    formData.get("email") || "",

                dateOfBirth:
                    formData.get("dob") || "",

                gender:
                    formData.get("gender") || "",

                bloodGroup:
                    formData.get("bloodGroup") || "",

                maritalStatus:
                    formData.get("maritalStatus") || "",

                occupation:
                    formData.get("occupation") || "",

                phone:
                    formData.get("phone") || "",

                address:
                    formData.get("address") || "",

                height:
                    formData.get("height") || "",

                weight:
                    formData.get("weight") || "",

                lifestyle:
                    formData.get("lifestyle") || "",

                foodHabits:
                    formData.get("foodHabits") || "",

                vegetarianType:
                    formData.get("vegetarianType") || "",

                meatFrequency:
                    formData.get("meatFrequency") || "",

                lactoseIntolerant:
                    formData.get("lactoseIntolerant") || "",

                hasFoodAllergies:
                    formData.get("hasFoodAllergies") || "",

                allergyDetails:
                    formData.get("allergyDetails") || "",

                typicalMealtimes:
                    formData.get("typicalMealtimes") || "",

                mealSystem:
                    formData.get("mealSystem") || "",

                weightChange:
                    formData.get("weightChange") || "",

                weightChangeKg:
                    formData.get("weightChangeKg") || "",

                alcoholConsumption:
                    formData.get("alcoholConsumption") || "",

                alcoholDetails:
                    formData.get("alcoholDetails") || "",

                gymGoer:
                    formData.get("gymGoer") || "",

                gymTiming:
                    formData.get("gymTiming") || "",

                supplementUse:
                    formData.get("supplementUse") || "",

                supplementDetails:
                    formData.get("supplementDetails") || "",

                chiefComplaint:
                    formData.get("chiefComplaint") || "",

                consultationPreference:
                    formData.get("consultationPreference") || "",

                diet:
                    formData.get("diet") || "",

                profilePicture:
                    ""
            };


            // =================================================
            // SEND TO BACKEND
            // =================================================

            try {

                const response =
                    await fetch(API_URL, {

                        method: "PUT",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                profileData
                            )
                    });


                // =============================================
                // HANDLE EXPIRED LOGIN
                // =============================================

                if (response.status === 401) {

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    window.location.href =
                        "login.html";

                    return;
                }


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to save your settings."
                    );
                }


                // =============================================
                // UPDATE LOCAL USER
                // =============================================

                const oldUser =
                    JSON.parse(
                        localStorage.getItem(
                            "user"
                        ) || "{}"
                    );


                const updatedUser = {

                    ...oldUser,

                    ...(result.user || result)
                };


                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        updatedUser
                    )
                );


                // =============================================
                // SUCCESS
                // =============================================

                alert(
                    "Your profile has been updated successfully."
                );


                window.location.href =
                    "dashboard.html";


            } catch (error) {

                console.error(
                    "Save error:",
                    error
                );


                alert(
                    error.message ||
                    "Something went wrong. Please try again."
                );


            } finally {

                saveButton.disabled = false;

                saveButton.innerHTML =
                    originalButtonText;
            }
        }
    );


    // =====================================================
    // FORM VALIDATION
    // =====================================================

    function validateForm() {

        const fullName =
            document
                .getElementById("fullName")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        const height =
            document
                .getElementById("height")
                .value;


        const weight =
            document
                .getElementById("weight")
                .value;


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        const phonePattern =
            /^[0-9+\-\s()]{7,20}$/;


        if (fullName.length < 3) {

            alert(
                "Please enter your full name."
            );

            return false;
        }


        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            return false;
        }


        if (!phonePattern.test(phone)) {

            alert(
                "Please enter a valid phone number."
            );

            return false;
        }


        if (
            !height ||
            height < 30 ||
            height > 250
        ) {

            alert(
                "Please enter a valid height between 30 and 250 cm."
            );

            return false;
        }


        if (
            !weight ||
            weight < 2 ||
            weight > 300
        ) {

            alert(
                "Please enter a valid weight between 2 and 300 kg."
            );

            return false;
        }


        const requiredRadioGroups = [

            "maritalStatus",
            "gender",
            "foodHabits",
            "mealSystem",
            "weightChange",
            "alcoholConsumption",
            "supplementUse",
            "consultationPreference"

        ];


        for (
            const groupName
            of requiredRadioGroups
        ) {

            const selected =
                document.querySelector(
                    `input[name="${groupName}"]:checked`
                );


            const selectElement =
                document.querySelector(
                    `select[name="${groupName}"]`
                );


            if (
                !selected &&
                (
                    !selectElement ||
                    !selectElement.value
                )
            ) {

                alert(
                    "Please complete all required fields."
                );

                return false;
            }
        }


        return true;
    }


    // =====================================================
    // CONDITIONAL FIELD: ALLERGIES
    // =====================================================

    document
        .querySelectorAll(
            'input[name="hasFoodAllergies"]'
        )
        .forEach((radio) => {

            radio.addEventListener(
                "change",
                () => {

                    if (
                        radio.value === "no" &&
                        radio.checked
                    ) {

                        document
                            .getElementById(
                                "allergyDetails"
                            )
                            .value = "";
                    }
                }
            );
        });


    // =====================================================
    // CONDITIONAL FIELD: ALCOHOL
    // =====================================================

    document
        .querySelectorAll(
            'input[name="alcoholConsumption"]'
        )
        .forEach((radio) => {

            radio.addEventListener(
                "change",
                () => {

                    if (
                        radio.value === "no" &&
                        radio.checked
                    ) {

                        document
                            .getElementById(
                                "alcoholDetails"
                            )
                            .value = "";
                    }
                }
            );
        });


    // =====================================================
    // CONDITIONAL FIELD: GYM
    // =====================================================

    document
        .querySelectorAll(
            'input[name="gymGoer"]'
        )
        .forEach((radio) => {

            radio.addEventListener(
                "change",
                () => {

                    if (
                        radio.value === "no" &&
                        radio.checked
                    ) {

                        document
                            .getElementById(
                                "gymTiming"
                            )
                            .value = "";
                    }
                }
            );
        });


    // =====================================================
    // CONDITIONAL FIELD: SUPPLEMENTS
    // =====================================================

    document
        .querySelectorAll(
            'input[name="supplementUse"]'
        )
        .forEach((radio) => {

            radio.addEventListener(
                "change",
                () => {

                    if (
                        radio.value === "no" &&
                        radio.checked
                    ) {

                        document
                            .getElementById(
                                "supplementDetails"
                            )
                            .value = "";
                    }
                }
            );
        });

});