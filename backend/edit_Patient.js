import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc, startAfter, endBefore, limitToLast} from "./firebaseConfig.js";


const pageSize = 10; // Show 10 patients per page
let lastVisible = null; // Stores the last document from the current page
let firstVisible = null; // Stores the first document from the current page
let currentPage = 1; // Current page number

// Modify the loadPatients function to accept searchTerm and searchBy parameters
async function loadPatients(orderById = true, searchTerm = "", searchBy = "id") {
    try {
        const patientsCollection = collection(db, "patients");
        let q;

        if (searchTerm) {
            // If there's a search term, filter by the selected field (id, Name, or MobileNo)
            if (searchBy === "id") {
                // Search by ID (exact match)
                q = query(patientsCollection, where("__name__", "==", searchTerm));
            } else if (searchBy === "Name") {
                // Search by Name (partial match)
                q = query(
                    patientsCollection,
                    where("Name", ">=", searchTerm),
                    where("Name", "<=", searchTerm + "\uf8ff")
                );
            } else if (searchBy === "MobileNo") {
                // Search by MobileNo (exact match)
                console.log(searchTerm);
                q = query(patientsCollection, where("MobileNo", ">=", searchTerm), where("MobileNo", "<=", searchTerm + "\uf8ff"));
            }
        } else if (lastVisible && orderById) {
            // If going to next page, start after the last visible document
            q = query(patientsCollection, orderBy("id"), startAfter(lastVisible), limit(pageSize));
        } else if (firstVisible && !orderById) {
            // If going to previous page, start before the first visible document
            q = query(patientsCollection, orderBy("id"), endBefore(firstVisible), limitToLast(pageSize));
        } else {
            // Default query for the first page
            q = query(patientsCollection, orderBy("id"), limit(pageSize));
        }

        const querySnapshot = await getDocs(q);
        const tbody = document.getElementById("patientsTableBody");
        tbody.innerHTML = "";

        if (querySnapshot.empty) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No patients found.</td></tr>`;
            return;
        }

        firstVisible = querySnapshot.docs[0]; // First document of current page
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Last document of current page

        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${doc.id}</td>
                <td>${patient.Name || "N/A"}</td>
                <td>${patient.Age || "N/A"}</td>
                <td>${patient.Address || "N/A"}</td>
                <td>${patient.MobileNo || "N/A"}</td>
                <td>
                    <button class="edit-btn openPopup" data-set="${doc.id}, ${patient.Name}, ${patient.Age}, ${patient.Address}, ${patient.MobileNo}, ${patient.BirthDate}, ${patient.Gender}">
                        Edit
                    </button>
                    <button class="edit-btn detlte-btn" style="margin-left: 20px; background-color: #f33333f6;" data-id="${doc.id}">
                        Delete
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });

        // Attach event listeners to the openPopup buttons
        document.querySelectorAll(".openPopup").forEach((button) => {
            button.addEventListener("click", (event) => {
                const [id, name, age, address, mobileNo, birthDate, gender] = event.target.dataset.set.split(",");
                openPopup(id, name, age, address, mobileNo, birthDate, gender);
            });
        });

        // Attach event listeners to the delete buttons
        document.querySelectorAll(".detlte-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
                const patientId = event.currentTarget.dataset.id;
                deletePatient(patientId);
            });
        });

        document.getElementById("currentPage").innerText = `Page ${currentPage}`;
        document.getElementById("prevPageBtn").disabled = currentPage === 1;
        document.getElementById("nextPageBtn").disabled = querySnapshot.size < pageSize;
        if(searchTerm) {
            document.getElementById("prevPageBtn").disabled = true;
            document.getElementById("nextPageBtn").disabled = true;
        }

    } catch (error) {
        console.error("Error fetching patients:", error);
        window.electronAPI.showErrorBox("Error", "Failed to load patients. Please try again.");
    }
}

// Add event listener to the search input field
document.getElementById("search-patient").addEventListener("input", function () {
    const searchTerm = this.value.trim();
    const searchBy = document.getElementById("select-by").value; // Get the selected search field
    currentPage = 1; // Reset to the first page when searching
    lastVisible = null; // Reset pagination state
    firstVisible = null; // Reset pagination state
    loadPatients(true, searchTerm, searchBy); // Load search results from page 1
});

// Add event listener to the select dropdown to trigger search when the option changes
document.getElementById("select-by").addEventListener("change", function () {
    const searchTerm = document.getElementById("search-patient").value.trim();
    const searchBy = this.value; // Get the selected search field
    currentPage = 1; // Reset to the first page when searching
    lastVisible = null; // Reset pagination state
    firstVisible = null; // Reset pagination state
    loadPatients(true, searchTerm, searchBy); // Load search results from page 1
});


document.getElementById("nextPageBtn").addEventListener("click", loadNextPage);
document.getElementById("prevPageBtn").addEventListener("click", loadPreviousPage);

// Load next page
async function loadNextPage() {
    if (lastVisible) {
        currentPage++;
        await loadPatients(true);
    }
}

// Load previous page
async function loadPreviousPage() {
    if (firstVisible) {
        currentPage--;
        await loadPatients(false);
    }
}

// Open Edit Popup
function openPopup(id, name, age, address, mobileNo, birthDate, gender) {
    console.log(id, name, age, address, mobileNo, birthDate, gender);
    let dateofbirth = new Date(birthDate);
    document.getElementById("patient-id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("age").value = parseInt(age);
    document.getElementById("address").value = address;
    document.getElementById("mobile").value = mobileNo;
    document.getElementById("dob-input-field").value = dateofbirth.toLocaleDateString("en-CA");
    document.getElementById("gender-select").value =  gender.toString().trim();
    document.getElementById('popup').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}


// Save Edited Patient Details
document.getElementById("update-btn").addEventListener("click", savePatientChanges);
async function savePatientChanges() {
    const patientId = document.getElementById("patient-id").value;
    const name = document.getElementById("name").value.trim();
    const birthDate = document.getElementById("dob-input-field").value.trim();
    const gender = document.getElementById("gender-select").value.trim();
    const age = parseInt(document.getElementById("age").value, 10);
    const mobileNo = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
  
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
        const updatedData = {
            Name: name,
            BirthDate: birthDate,
            Gender: gender,
            Age: age,
            MobileNo: mobileNo,
            Address: address,
        };
        const patientRef = doc(db, "patients", patientId);
        await updateDoc(patientRef, updatedData);
        console.log(`Patient ${patientId} updated successfully.`);
        window.electronAPI.showSuccessBox("Success", "Patient details updated successfully.");
        // call click event to close the popup
        document.getElementById("close-btn").click();
        // window.location.reload();
        currentPage = 1;
        lastVisible = null;
        firstVisible = null;
        loadPatients();
    } catch (error) {
        console.error("Error updating patient:", error);
        window.electronAPI.showErrorBox("Error", "Failed to update patient details.");
    }
}

// Delete Patient
async function deletePatient(patientId) {
    try {
         // Trigger confirmation dialog
         const response = await window.electronAPI.showMessageBox(
            "warning",
            "Are you sure you want to delete this patient?",
            "Confirm",
            ["Yes", "No"]
        );

        if (response === 1) {
            return;
        }
        const patientRef = doc(db, "patients", patientId);
        await deleteDoc(patientRef);
        console.log(`Patient ${patientId} deleted successfully.`);
        window.electronAPI.showSuccessBox("Success", "Patient deleted successfully.");
        // reload the page
        window.location.reload();
    } catch (error) {
        console.error("Error deleting patient:", error);
        window.electronAPI.showErrorBox("Error", "Failed to delete patient.");
    }
}

// Load patients when the page loads
window.onload = () => loadPatients();
