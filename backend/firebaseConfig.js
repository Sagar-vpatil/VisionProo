// Import the functions you need from the SDKs you need
// Import the required Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc,enableIndexedDbPersistence} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvDMINgvqK7g1q8acysO5gCeLw1nMfC74",
  authDomain: "visionproo-project.firebaseapp.com",
  projectId: "visionproo-project",
  storageBucket: "visionproo-project.firebasestorage.app",
  messagingSenderId: "364295190765",
  appId: "1:364295190765:web:c7e12ba62bf022a2b3b4e4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

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

export { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc };