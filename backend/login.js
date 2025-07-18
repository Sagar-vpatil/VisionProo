import { db, auth, collection, getDocs, query, where, signInWithEmailAndPassword} from "./firebaseConfig.js";


// DOM load event
document.addEventListener("DOMContentLoaded", () => {
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


    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();


    loaderOverlay.style.display = "flex";


    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Logged in as:', user.email);


        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);


        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            localStorage.setItem("user", JSON.stringify(userData));
            loaderOverlay.style.display = "none";
            redirectUser(userData.position);
        } else {
            loaderOverlay.style.display = "none";
            window.electronAPI.showErrorBox("Error", "User role data not found in database. Please contact admin.");
        }
    } catch (error) {
        console.error("Login failed:", error);
        loaderOverlay.style.display = "none";
        window.electronAPI.showErrorBox("Error", "Invalid email or password. Please try again.");
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
