import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc} from "./firebaseConfig.js";

// Dom load event
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded");
  });


async function loadTodayAppointments() {
    try {
        // Reference to the TodayAppointments collection
        const appointmentsCollection = collection(db, "TodayAppointments");

        // Fetch all documents
        const querySnapshot = await getDocs(appointmentsCollection);

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
                <td>${appointment.patientId}</td>
                <td>${appointment.name}</td>
                <td>${appointment.dob}</td>
                <td>${calculateAge(appointment.dob)}</td>
                <td>${appointment.address}</td>
                <td>${appointment.mobileNo}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewSummary('${appointment.patientId}')">
                        <span style="font-size: 20px;">👁️</span> View Summary
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-md" onclick="editPatient('${appointment.patientId}')">
                        <span style="font-size: 18px;">🖊️</span> Edit
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
    } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Failed to load appointments. Please try again.");
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
