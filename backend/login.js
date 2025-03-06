import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc} from "./firebaseConfig.js";


// Dom load event
document.addEventListener("DOMContentLoaded", async () => {
   console.log("DOM loaded");
});
// Check Local Storage for existing user session
const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) {
    redirectUser(storedUser.position);
}

const loaderOverlay = document.getElementById("loader-overlay");

// Login Form Submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Username:", username);
    console.log("Password:", password);
    loaderOverlay.style.display = "flex";

    try {
        // Create a Firestore query
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        console.log("Query Snapshot:", querySnapshot);

        if (!querySnapshot.empty) {
            // User authenticated successfully
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify(userData));

            // Hide the loader overlay after data loads
            loaderOverlay.style.display = "none";

            // Redirect user based on position
            redirectUser(userData.position);
        } else {
            window.electronAPI.showErrorBox("Error", "Invalid username or password. Please try again.");
            // Hide the loader overlay after data loads
            loaderOverlay.style.display = "none";
        }
    } catch (error) {
        console.error("Error during login:", error);
        window.electronAPI.showErrorBox("Error", "An error occurred during login. Please try again.");
        // Hide the loader overlay after data loads
        loaderOverlay.style.display = "none";
    }
});

// Redirect user based on position
function redirectUser(position) {
    if (position === "Doctor") {
        window.location.href = "../subpages/view_Appointments.html";
    } else if (position === "Receptionist") {
        window.location.href = "../subpages/add_Patient.html";
    } else {
        window.electronAPI.showErrorBox("Error", "Unknown position. Please contact admin.");
    }
}