// This file contains the code to add a patient to the Firestore database.
import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc} from "./firebaseConfig.js";

document.getElementById("add-patient-btn").addEventListener("click", async function () {
  console.log("Add Patient button clicked");

  const name = document.getElementById("name-input-field").value.trim();
  const birthDate = document.getElementById("dob-input-field").value.trim();
  const gender = document.getElementById("gender-select").value.trim();
  const age = parseInt(document.getElementById("age-input-field").value, 10);
  const mobileNo = document.getElementById("mobile-input-field").value.trim();
  const address = document.getElementById("address-input-field").value.trim();

  console.log("Patient Details:", { name, birthDate, age, mobileNo, address });

  if (!name || isNaN(age) || !mobileNo || !address || !gender) {
      window.electronAPI.showErrorBox("Error", "Please fill in all the fields.");
      return;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(mobileNo)) {
      window.electronAPI.showErrorBox("Error", "Please enter a valid phone number.");
      return;
  }

  if (age < 0 || age > 120) {
      window.electronAPI.showErrorBox("Error", "Please enter a valid age.");
      return;
  }

//   const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
//   if (!birthDatePattern.test(birthDate)) {
//       window.electronAPI.showErrorBox("Error", "Please enter a valid date (YYYY-MM-DD).");
//       return;
//   }

  // Trigger confirmation dialog
  const response = await window.electronAPI.showMessageBox(
    "info",
    "Do you want to add this patient?",
    "Add Patient",
    ["Yes", "No"]
   );

  if (response === 1) {
      return;
  }


  try {
      const patientsCollection = collection(db, "patients");
      const q = query(patientsCollection, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let newId = 1;
      if (!querySnapshot.empty) {
        console.log("Query Snapshot:");
          const lastDoc = querySnapshot.docs[0];
          newId = lastDoc.data().id + 1;
      }

      const newDocRef = doc(db, "patients", newId.toString());
      await setDoc(newDocRef, {
          id: newId,
          Name: name,
          BirthDate: birthDate,
          Gender: gender,
          Age: age,
          MobileNo: mobileNo,
          Address: address,
          AppointmentStatus: "Deactive",
      });

      console.log("Patient added with ID:", newId);
      window.electronAPI.showSuccessBox("Success", "The patient has been added successfully!");
      // Clear the input fields
      document.getElementById("name-input-field").value = "";
      document.getElementById("dob-input-field").value = "";
      document.getElementById("gender-select").value = "";
      document.getElementById("age-input-field").value = "";
      document.getElementById("mobile-input-field").value = "";
      document.getElementById("address-input-field").value = "";
  } catch (error) {
      console.error("Error adding patient:", error);
      window.electronAPI.showErrorBox("Error", "Failed to add patient.");
  }
});



document.getElementById("search-box").addEventListener("input", async function () {
    const searchBy = document.getElementById("search-by").value; 
    const searchValue = this.value.trim(); // Get the search value and trim whitespace
    console.log("Search value:", searchValue);

    // Exit early if no input
    if (!searchValue) {
        updatePatientTable([]);
        return;
    }

    try {
        const patientsCollection = collection(db, "patients");
        const results = [];
        if (searchBy === "Name") {
        // Search by Name
        const nameQuery = query(
            patientsCollection,
            where("Name", ">=", searchValue),
            where("Name", "<", searchValue + "\uf8ff"),
            limit(5)
        );
        const nameSnapshot = await getDocs(nameQuery);
        nameSnapshot.forEach(doc => {
            const data = doc.data();
            results.push({
                id: doc.id,
                name: data.Name,
                mobileNo: data.MobileNo,
            });
        });
        } else if (searchBy === "MobileNo") {

        // Search by MobileNo
        const mobileQuery = query(
            patientsCollection,
            where("MobileNo", ">=", searchValue),
            where("MobileNo", "<", searchValue + "\uf8ff"),
            limit(5)
        );
        const mobileSnapshot = await getDocs(mobileQuery);
        mobileSnapshot.forEach(doc => {
            const data = doc.data();
            if (!results.some(patient => patient.id === doc.id)) {
                results.push({
                    id: doc.id,
                    name: data.Name,
                    mobileNo: data.MobileNo,
                });
            }
        });
      }else {

        // Search by ID (Document ID)
        const idDocRef = doc(patientsCollection, searchValue);
        const idDocSnapshot = await getDoc(idDocRef);
        if (idDocSnapshot.exists()) {
            const data = idDocSnapshot.data();
            if (!results.some(patient => patient.id === idDocSnapshot.id)) {
                results.push({
                    id: idDocSnapshot.id,
                    name: data.Name,
                    mobileNo: data.MobileNo,
                });
            }
        }
    }

        console.log("Patients:", results);

        // Update the table with search results
        updatePatientTable(results);
    } catch (error) {
        console.error("Error fetching patients: ", error);
    }
});

export async function openPatientDetails(patientId) {
    try {
        // Fetch patient details from Firestore
        console.log("Opening patient details for ID:", patientId);
        const docRef = doc(db, "patients", patientId); // Replace 'patients' with your Firestore collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const patientData = docSnap.data();
            

            // Populate the Patient ID input field
            const patientIdField = document.getElementById("patient-id-input-field");
            patientIdField.value = patientId;
           // Make the hidden field visible
            const hiddenField = patientIdField.closest(".form-group");
            hiddenField.style.display = "flex";

            // Populate form fields
            document.getElementById("name-input-field").value = patientData.Name || "";
            document.getElementById("dob-input-field").value = patientData.BirthDate || "";
            document.getElementById("gender-select").value = patientData.Gender || "";
            document.getElementById("age-input-field").value = patientData.Age || "";
            document.getElementById("mobile-input-field").value = patientData.MobileNo || "";
            document.getElementById("address-input-field").value = patientData.Address || "";

            // Enable/Disable buttons
            document.getElementById("add-patient-btn").disabled = true;
            document.getElementById("add-appointment-btn").disabled = false;
        } else {
            console.error("No such patient found!");
        }
    } catch (error) {
        console.error("Error fetching patient details:", error);
    }
}

// Function to update the table with search results
function updatePatientTable(patients) {
    const tbody = document.querySelector("table.table tbody");
    tbody.innerHTML = ""; // Clear existing rows

    if (patients.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No patients found</td></tr>`;
        return;
    }

    patients.forEach(patient => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.mobileNo}</td>
            <td>
               <button class="btn btn-info" style="margin-left: 5px;" type="button" id="patientDetailsButton-${patient.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" style="font-size: 20px;">
                    <!-- Outer eye -->
                    <path fill="currentColor" d="M12 4.5C7 4.5 3 7.5 1.5 12C3 16.5 7 19.5 12 19.5C17 19.5 21 16.5 22.5 12C21 7.5 17 4.5 12 4.5Z" />
                    <!-- Iris -->
                    <circle fill="white" cx="12" cy="12" r="4.5" />
                    <!-- Pupil -->
                    <circle fill="currentColor" cx="12" cy="12" r="2" />
                    <!-- Highlight on the pupil -->
                    <circle fill="white" cx="12.7" cy="11.3" r="0.5" />
                </svg>
            </button>


            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add event listener for patient details button
// document.querySelector("table.table tbody").addEventListener("click", async function (event) {
//     console.log("Table row clicked:", event.target.tagName);
//     if (event.target.tagName === "BUTTON" || event.target.tagName === "circle" || event.target.tagName === "svg" || event.target.tagName === "path") {
//         const patientId = event.target.id.split("-")[1];
//         console.log("Patient ID:", patientId);
//         openPatientDetails(patientId);
//     }
// });

document.querySelector("table.table tbody").addEventListener("click", async function (event) {
    console.log("Table row clicked:", event.target.tagName);

    // Traverse up to the button if a child element (e.g., circle, svg, path) is clicked
    let target = event.target;
    while (target && target.tagName !== "BUTTON") {
        target = target.parentElement;
    }

    // Check if a button with the expected ID format is clicked
    if (target && target.id.startsWith("patientDetailsButton-")) {
        const patientId = target.id.split("-")[1];
        console.log("Patient ID:", patientId);
        openPatientDetails(patientId);
    }
});

document.getElementById("add-appointment-btn").addEventListener("click", async () => {
    // Get Patient ID
    const patientId = document.getElementById("patient-id-input-field").value;

    // Validate Patient ID
    if (!patientId) {
        window.electronAPI.showErrorBox("Error", "Please enter Patient ID.");
        return;
    }

    // Trigger confirmation dialog
    const response = await window.electronAPI.showMessageBox(
        "info",
        "Do you want to add an appointment for this patient?",
        "Add Appointment",
        ["Yes", "No"]
    );

    if (response === 0) { // "Yes" button clicked
        try {
            // Query Firestore to check if an appointment already exists for the patient
            // const q = query(collection(db, "TodayAppointments"), where("patientId", "==", patientId));
            // const querySnapshot = await getDocs(q);

            // if (!querySnapshot.empty) {
            //     window.electronAPI.showErrorBox("Error", "An appointment already exists for this patient.");
            //     return;
            // }

            // const name = document.getElementById("name-input-field").value;
            // const dob = document.getElementById("dob-input-field").value;
            // const mobileNo = document.getElementById("mobile-input-field").value;
            // const address = document.getElementById("address-input-field").value;
            // const todaysDate = new Date().toISOString().split('T')[0];

            // const appointmentData = {
            //     patientId: patientId,
            //     name: name,
            //     dob: dob,
            //     mobileNo: mobileNo,
            //     address: address,
            //     appointmentDate: todaysDate,
            // };

            // Add to TodayAppointments collection in Firestore
            // await addDoc(collection(db, "TodayAppointments"), appointmentData);

            // Change the appointment status in the Patients collection
            //check if the appointment status already Active or not

            const patientDocRef = doc(db, "patients", patientId);
            const patientDoc = await getDoc(patientDocRef);
            if (patientDoc.exists()) {
                const patientData = patientDoc.data();
                if (patientData.AppointmentStatus === "Active") {
                    window.electronAPI.showErrorBox("Error", "An appointment already exists for this patient.");
                    return;
                }
            }

            // Update the appointment status in the Patients collection
            await setDoc(patientDocRef, { AppointmentStatus: "Active" }, { merge: true });


            window.electronAPI.showSuccessBox("Success", "Appointment added successfully!");
            document.getElementById("patient-id-input-field").value = "";
            document.getElementById("name-input-field").value = "";
            document.getElementById("dob-input-field").value = "";
            document.getElementById("mobile-input-field").value = "";
            document.getElementById("address-input-field").value = "";

            document.getElementById("add-appointment-btn").disabled = true;
            document.getElementById("add-patient-btn").disabled = false;
            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error("Error adding appointment:", error);
            window.electronAPI.showErrorBox("Error", "Failed to add appointment.");
        }
    } else {
        return;
    }
});

// Refresh the page when the "Refresh" button is clicked
document.getElementById("refresh-btn").addEventListener("click", async function () {
     // Trigger confirmation dialog
  const response = await window.electronAPI.showMessageBox(
    "info",
    "Do you want to refresh the page?",
    "Confirm Refresh",
    ["Yes", "No"]
   );

  if (response === 1) {
      return;
  }

  window.location.reload();
});

document.getElementById("logout").addEventListener("click", async function () {
     // Trigger confirmation dialog for logout
     const response = await window.electronAPI.showMessageBox(
        "warning",
        "Are you sure you want to logout?",
        "Logout",
        ["Yes", "No"]
      );
  
    if (response === 1) {
        return;
    }
        // Clear user data from local storage
        localStorage.removeItem("user");
  
      window.electronAPI.navigateBack();
});

// Check Local Storage for existing user session
const storedUser = JSON.parse(localStorage.getItem("user"));

// Reference the home button
const homeBtn = document.getElementById("home-btn");

// Logic to display the button
if (storedUser && storedUser.position === "Doctor") {
    // Show the button if the position is 'Doctor'
    homeBtn.style.display = "inline-block";
} else if (!storedUser) {
    // Show the button if no user is stored
    homeBtn.style.display = "inline-block";
} else {
    // Hide the button for other cases
    homeBtn.style.display = "none";
}

// Add event listener for the home button
homeBtn.addEventListener("click", async () => {
   // Redirect the user to main.html
    window.location.href = "view_Appointments.html";
});


// Restrict the date picker to allow only previous dates
document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.getElementById("dob-input-field");
    
    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    
    // Set the max attribute to today's date
    dobInput.setAttribute("max", today);
});