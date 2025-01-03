const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { getDocs, query, orderBy, limit , setDoc, doc} = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBvDMINgvqK7g1q8acysO5gCeLw1nMfC74",
    authDomain: "visionproo-project.firebaseapp.com",
    projectId: "visionproo-project",
    storageBucket: "visionproo-project.firebasestorage.app",
    messagingSenderId: "364295190765",
    appId: "1:364295190765:web:c7e12ba62bf022a2b3b4e4"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  // addPatient("John Doe", 45, "Cataract");
document.getElementById("get-data").addEventListener("click", async function () {
    console.log("add-data button clicked");
    // addPatient("John Doe", 45, "Cataract");
    const visitDate = document.getElementById("visitDate").value;
    const patientName = document.getElementById("patientName").value;
    const gender = document.getElementById("gender").value;
    const mobileNo = document.getElementById("mobileNo").value;
    const address = document.getElementById("address").value;
    try {
        const patientsCollection = collection(db, "patients");
    
        // Step 1: Get the document with the highest ID
        const q = query(patientsCollection, orderBy("id", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
    
        // Step 2: Determine the new ID
        let newId = 1; // Default ID if the collection is empty
        if (!querySnapshot.empty) {
          const lastDoc = querySnapshot.docs[0];
          newId = lastDoc.data().id + 1; // Increment the highest ID
        }
    
        // Step 3: Save the record with the unique ID as the Document ID
        const newDocRef = doc(db, "patients", newId.toString()); // Use newId as the Document ID
        await setDoc(newDocRef, {
         patientName: patientName,
         Gender: gender,
         MobileNo: mobileNo,
         Address: address,
         VisitDate: visitDate,
        });
    
        console.log("Patient added with Unique Document ID:", newId);
      } catch (error) {
        console.error("Error adding patient: ", error);
      }
    
  });