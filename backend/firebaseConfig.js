// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


export { firebaseApp, db };