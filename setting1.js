/* =========================================================
   SETTINGS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const settingsForm = document.getElementById("settingsForm");

    const profilePhoto = document.getElementById("profilePhoto");
    const profilePreview = document.getElementById("profilePreview");
    const defaultAvatar = document.getElementById("defaultAvatar");

    const saveButton = document.querySelector(".save-button");

    const API_URL = "http://localhost:5000/api/users/profile";

    /* =====================================================
       CHECK LOGIN
    ===================================================== */

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    /* =====================================================
       LOAD SAVED USER DATA
    ===================================================== */

    loadUserData();


    async function loadUserData() {
        try {
            const savedUser = localStorage.getItem("user");

            if (savedUser) {
                const user = JSON.parse(savedUser);
                fillUserData(user);
            }

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                return;
            }

            const result = await response.json();

            const userData = result.user || result;

            fillUserData(userData);

        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }


    /* =====================================================
       FILL FORM WITH USER DATA
    ===================================================== */

    function fillUserData(user) {
        if (!user) return;

        setValue("fullName", user.fullName || user.name);
        setValue("email", user.email);
        setValue("phone", user.phone);
        setValue("dob", user.dob);
        setValue("gender", user.gender);
        setValue("bloodGroup", user.bloodGroup);
        setValue("occupation", user.occupation);
        setValue("address", user.address);

        setValue("height", user.height);
        setValue("weight", user.weight);

        setValue("allergyDetails", user.allergyDetails);
        setValue("typicalMealtimes", user.typicalMealtimes);
        setValue("weightChangeKg", user.weightChangeKg);
        setValue("alcoholDetails", user.alcoholDetails);
        setValue("gymTiming", user.gymTiming);
        setValue("supplementDetails", user.supplementDetails);
        setValue("chiefComplaint", user.chiefComplaint);

        setValue("diet", user.diet);

        setRadioValue("maritalStatus", user.maritalStatus);
        setRadioValue("lifestyle", user.lifestyle);
        setRadioValue("foodHabits", user.foodHabits);
        setRadioValue("vegetarianType", user.vegetarianType);
        setRadioValue("meatFrequency", user.meatFrequency);
        setRadioValue("lactoseIntolerant", user.lactoseIntolerant);
        setRadioValue("hasFoodAllergies", user.hasFoodAllergies);
        setRadioValue("mealSystem", user.mealSystem);
        setRadioValue("weightChange", user.weightChange);
        setRadioValue("alcoholConsumption", user.alcoholConsumption);
        setRadioValue("gymGoer", user.gymGoer);
        setRadioValue("supplementUse", user.supplementUse);
        setRadioValue(
            "consultationPreference",
            user.consultationPreference
        );

        if (user.profilePhoto || user.photo) {
            showProfilePhoto(user.profilePhoto || user.photo);
        }
    }


    function setValue(id, value) {
        const element = document.getElementById(id);

        if (element && value !== undefined && value !== null) {
            element.value = value;
        }
    }


    function setRadioValue(name, value) {
        if (!value) return;

        const radio = document.querySelector(
            `input[name="${name}"][value="${value}"]`
        );

        if (radio) {
            radio.checked = true;
        }
    }


    /* =====================================================
       PROFILE PHOTO PREVIEW
    ===================================================== */

    profilePhoto.addEventListener("change", () => {
        const file = profilePhoto.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            profilePhoto.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Profile photo must be less than 5 MB.");
            profilePhoto.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            showProfilePhoto(event.target.result);
        };

        reader.readAsDataURL(file);
    });


    function showProfilePhoto(imageSource) {
        profilePreview.src = imageSource;
        profilePreview.classList.add("active");

        if (defaultAvatar) {
            defaultAvatar.classList.add("hidden");
        }
    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    settingsForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const originalButtonText = saveButton.innerHTML;

        saveButton.disabled = true;
        saveButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Saving...
        `;

        const formData = new FormData(settingsForm);

        const profileFile = profilePhoto.files[0];

        if (profileFile) {
            formData.append("profilePhoto", profileFile);
        }

        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to save your settings."
                );
            }

            /* Update local user information */

            const oldUser = JSON.parse(
                localStorage.getItem("user") || "{}"
            );

            const updatedUser = {
                ...oldUser,
                ...(result.user || result)
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            alert("Your profile has been updated successfully.");

            window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Save error:", error);

            alert(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            saveButton.disabled = false;
            saveButton.innerHTML = originalButtonText;
        }
    });


    /* =====================================================
       FORM VALIDATION
    ===================================================== */

    function validateForm() {
        const fullName = document
            .getElementById("fullName")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const phone = document
            .getElementById("phone")
            .value
            .trim();

        const height = document
            .getElementById("height")
            .value;

        const weight = document
            .getElementById("weight")
            .value;

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern =
            /^[0-9+\-\s()]{7,20}$/;

        if (fullName.length < 3) {
            alert("Please enter your full name.");
            return false;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number.");
            return false;
        }

        if (!height || height < 30 || height > 250) {
            alert("Please enter a valid height between 30 and 250 cm.");
            return false;
        }

        if (!weight || weight < 2 || weight > 300) {
            alert("Please enter a valid weight between 2 and 300 kg.");
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

        for (const groupName of requiredRadioGroups) {
            const selected = document.querySelector(
                `input[name="${groupName}"]:checked`
            );

            const selectElement = document.querySelector(
                `select[name="${groupName}"]`
            );

            if (
                !selected &&
                (!selectElement || !selectElement.value)
            ) {
                alert("Please complete all required fields.");
                return false;
            }
        }

        return true;
    }


    /* =====================================================
       AUTO CLEAR CONDITIONAL FIELDS
    ===================================================== */

    document
        .querySelectorAll('input[name="hasFoodAllergies"]')
        .forEach((radio) => {
            radio.addEventListener("change", () => {
                if (radio.value === "no" && radio.checked) {
                    document.getElementById("allergyDetails").value = "";
                }
            });
        });


    document
        .querySelectorAll('input[name="alcoholConsumption"]')
        .forEach((radio) => {
            radio.addEventListener("change", () => {
                if (radio.value === "no" && radio.checked) {
                    document.getElementById("alcoholDetails").value = "";
                }
            });
        });


    document
        .querySelectorAll('input[name="gymGoer"]')
        .forEach((radio) => {
            radio.addEventListener("change", () => {
                if (radio.value === "no" && radio.checked) {
                    document.getElementById("gymTiming").value = "";
                }
            });
        });


    document
        .querySelectorAll('input[name="supplementUse"]')
        .forEach((radio) => {
            radio.addEventListener("change", () => {
                if (radio.value === "no" && radio.checked) {
                    document.getElementById(
                        "supplementDetails"
                    ).value = "";
                }
            });
        });

});