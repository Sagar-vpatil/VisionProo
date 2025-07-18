// Import the functions you need from the SDKs you need
// Import the required Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc,enableIndexedDbPersistence, startAfter, endBefore, limitToLast} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6RUMVTE0GpI6qEiHuI-uw4oDFIDDtItY",
    authDomain: "eye-hospital-ee88e.firebaseapp.com",
    projectId: "eye-hospital-ee88e",
    storageBucket: "eye-hospital-ee88e.firebasestorage.app",
    messagingSenderId: "173931536781",
    appId: "1:173931536781:web:fbf50296e7b05d57235dc4",
    measurementId: "G-GWM7MZ1FJC"

  };
 
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Auth initialization
const auth = getAuth(firebaseApp);




// Enable offline persistence
enableIndexedDbPersistence(db)
    .then(() => {
        console.log("Offline persistence enabled!");
    })
    .catch((err) => {
        if (err.code === "failed-precondition") {
            console.error("Multiple tabs open, persistence can only be enabled in one tab.");
        } else if (err.code === "unimplemented") {
            console.error("Offline persistence is not supported by the browser.");
        } else {
            console.error("Error enabling offline persistence:", err);
        }
    });


export { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc, startAfter, endBefore, limitToLast, auth, signInWithEmailAndPassword};
