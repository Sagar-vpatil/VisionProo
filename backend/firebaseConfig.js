// Import the functions you need from the SDKs you need
// Import the required Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc,enableIndexedDbPersistence, startAfter, endBefore, limitToLast } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB97TAe4MUlVYayUwSNlLLkkxj4_wPuSMo",
  authDomain: "fir-project-31ba5.firebaseapp.com",
  projectId: "fir-project-31ba5",
  storageBucket: "fir-project-31ba5.firebasestorage.app",
  messagingSenderId: "1063443419004",
  appId: "1:1063443419004:web:23e6fc58f1d03e57111ef9",
  measurementId: "G-2B0HDYPFKS"
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

export { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc, updateDoc, deleteDoc, startAfter, endBefore, limitToLast };