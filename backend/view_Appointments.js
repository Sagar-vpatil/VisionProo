import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc} from "./firebaseConfig.js";

// Dom load event
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded");
  });


async function loadTodayAppointments() {
    try {
        // Reference to the patients collection where AppointmentStatus is "Active"
        const patientsCollection = collection(db, "patients");
        const q = query(patientsCollection, where("AppointmentStatus", "==", "Active"));

        // Fetch all documents
        const querySnapshot = await getDocs(q);

        // Reference to the table body
        const tbody = document.querySelector("table tbody");

        // Clear existing table rows
        tbody.innerHTML = "";

        // Iterate through each document in the collection
        querySnapshot.forEach((doc) => {
            const appointment = doc.data(); // Get appointment data
            const row = document.createElement("tr");

            // Populate row with appointment details
            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.Name}</td>
                <td>${appointment.BirthDate}</td>
                <td>${calculateAge(appointment.BirthDate)}</td>
                <td>${appointment.Address}</td>
                <td>${appointment.MobileNo}</td>
                <td>
                    <button class="btn btn-info btn-sm view-summary-btn" data-id="${appointment.id}">
                        <span style="font-size: 20px;">👁️</span> View Summary
                    </button>
                </td>
                <td>
                     <button class="btn btn-danger btn-md delete-btn" data-id="${appointment.id}">
                        <span style="font-size: 18px;">🗙</span> Delete
                    </button>
                </td>
            `;

            // Append the row to the table body
            tbody.appendChild(row);
        });

        if (querySnapshot.empty) {
            const emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `<td colspan="8" style="text-align: center;">No appointments found.</td>`;
            tbody.appendChild(emptyRow);
        }

        // Attach event listeners to the delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                console.log("Delete button clicked");
                const appointmentId = event.currentTarget.dataset.id; // Get the ID from the button's data attribute
                deleteAppointment(appointmentId);
            });
        });

        // Attach event listeners to the view summary buttons
        document.querySelectorAll(".view-summary-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                console.log("View Summary button clicked");
                const appointmentId = event.currentTarget.dataset.id; // Get the ID from the button's data attribute
                // viewSummary(appointmentId);
            });
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        window.electronAPI.showErrorBox("Error", "Failed to load appointments. Please try again.");
    }
}

// Helper function to calculate age from DOB
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Call this function to load appointments on page load
window.onload = loadTodayAppointments;

// Function to change AppointmentStatus to "Deactive"
async function deleteAppointment(appointmentId) {
    try {
        // Trigger confirmation dialog
        const response = await window.electronAPI.showMessageBox(
            "info",
            "Are you sure you want to delete this appointment?",
            "Confirm",
            ["Yes", "No"]
        );

        if (response === 1) {
            return;
        }
        const appointmentRef = doc(db, "patients", appointmentId);
        await updateDoc(appointmentRef, { AppointmentStatus: "Deactive" });
        console.log(`Appointment ${appointmentId} marked as Deactive.`);
        loadTodayAppointments(); // Refresh the list
    } catch (error) {
        console.error("Error updating appointment status:", error);
        window.electronAPI.showErrorBox("Error", "Failed to delete appointment. Please try again.");
    }
}

