const appointmentsList = document.getElementById("appointmentsList");
const messageBox = document.getElementById("message");

const token = localStorage.getItem("token");

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;

    setTimeout(() => {
        messageBox.className = "message";
        messageBox.textContent = "";
    }, 4000);
}

function formatDate(dateValue) {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function formatStatus(status) {
    const cleanStatus = String(status || "pending").toLowerCase();

    const statusNames = {
        pending: "Pending",
        confirmed: "Confirmed",
        completed: "Completed",
        cancelled: "Cancelled",
        canceled: "Cancelled"
    };

    return statusNames[cleanStatus] || status;
}

function getStatusClass(status) {
    const cleanStatus = String(status || "pending").toLowerCase();

    if (cleanStatus === "confirmed") {
        return "status-confirmed";
    }

    if (cleanStatus === "completed") {
        return "status-completed";
    }

    if (cleanStatus === "cancelled" || cleanStatus === "canceled") {
        return "status-cancelled";
    }

    return "status-pending";
}

function canCancelAppointment(appointment) {
    const status = String(appointment.status || "").toLowerCase();

    return (
        status === "pending" ||
        status === "confirmed"
    );
}

function renderAppointments(appointments) {
    appointmentsList.innerHTML = "";

    if (!appointments || appointments.length === 0) {
        appointmentsList.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    You have no appointments yet.
                </td>
            </tr>
        `;
        return;
    }

    appointments.forEach((appointment) => {
        const status = String(
            appointment.status || "pending"
        ).toLowerCase();

        const cancelAllowed = canCancelAppointment(appointment);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${formatDate(appointment.appointmentDate)}</td>

            <td>${appointment.appointmentTime || "N/A"}</td>

            <td>${appointment.appointmentType || "N/A"}</td>

            <td>${appointment.mode || appointment.consultationMode || "N/A"}</td>

            <td>
                <span class="status ${getStatusClass(status)}">
                    ${formatStatus(status)}
                </span>
            </td>

            <td>
                ${
                    cancelAllowed
                        ? `
                            <button
                                class="cancel-btn"
                                data-id="${appointment._id || appointment.id}"
                            >
                                Cancel
                            </button>
                          `
                        : `
                            <span class="not-eligible">
                                Not available
                            </span>
                          `
                }
            </td>
        `;

        appointmentsList.appendChild(row);
    });

    document.querySelectorAll(".cancel-btn").forEach((button) => {
        button.addEventListener("click", () => {
            cancelAppointment(button.dataset.id, button);
        });
    });
}

async function loadAppointments() {
    if (!token) {
        appointmentsList.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Please login to view your appointments.
                </td>
            </tr>
        `;
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:5000/api/appointments/my",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to load appointments."
            );
        }

        const appointments = Array.isArray(data)
            ? data
            : data.appointments || [];

        renderAppointments(appointments);

    } catch (error) {
        console.error("Load appointments error:", error);

        appointmentsList.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Unable to load appointments.
                </td>
            </tr>
        `;

        showMessage(error.message, "error");
    }
}

async function cancelAppointment(appointmentId, button) {
    const confirmation = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (!confirmation) {
        return;
    }

    button.disabled = true;
    button.textContent = "Cancelling...";

    try {
        const response = await fetch(
            `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to cancel appointment."
            );
        }

        showMessage(
            "Appointment cancelled successfully.",
            "success"
        );

        loadAppointments();

    } catch (error) {
        console.error("Cancel appointment error:", error);

        showMessage(
            error.message || "Something went wrong.",
            "error"
        );

        button.disabled = false;
        button.textContent = "Cancel";
    }
}

loadAppointments();