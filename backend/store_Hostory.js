 // This file contains the code to add a patient to the Firestore database.
import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc} from "./firebaseConfig.js";




// Dom event listener when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load the patient history when the page is loaded
  loadPatientHistory(appointment.id);
});






 function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed

    return `${hours}:${minutes} ${amPm}`;
  }

  document.getElementById("Right-mmHg-Time").addEventListener("focus", function () {
    this.value = getCurrentTime();
  });

  document.getElementById("Left-mmHg-Time").addEventListener("focus", function () {
    this.value = getCurrentTime();
  });



  // Function to format today's date as ddmmyyyy
function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = today.getFullYear();
  return `${dd}${mm}${yyyy}`;
}
  
document.getElementById("print-btn").addEventListener("click",async function () {
  // Store Vision Table the dictionary name and value
  const visionTable = {
    UnaidedR : document.getElementById("UnaidedR").value,
    UnaidedL : document.getElementById("UnaidedL").value,
    GlassesR : document.getElementById("GlassesR").value,
    GlassesL : document.getElementById("GlassesL").value,
    NearVisionR : document.getElementById("Near-VisionR").value,
    NearVisionL : document.getElementById("Near-VisionL").value,
    PinholeR : document.getElementById("PinholeR").value,
    PinholeL : document.getElementById("PinholeL").value,
  }
  let count = 0;

  for (const key in visionTable) {
    if (visionTable[key] === "") {
      count += 1;
    }
  }

  console.log(count);

  console.log(visionTable); 

  if (count === 8) {
    console.log("All the values are empty");
    localStorage.setItem("visionTable_count", "false");
  } else {
    console.log("All the values are not empty");
    localStorage.setItem("visionTable_count", "true");
  }

  console.log(localStorage.getItem("visionTable_count"));
  
  // Save the visionTable to localStorage
  localStorage.setItem(
    "visionTable",
    JSON.stringify(visionTable)
  );

   // Store Current Power Glasses the dictionary name and value
   const currentPowerGlasses = {
    DVSPH: document.getElementById("DV-SPH").value,
    DVCYL: document.getElementById("DV-CYL").value,
    DVAxis:document.getElementById("DV-Axis").value,
    DVVA: document.getElementById("DV-VA").value,
    DVSPH2: document.getElementById("DV-SPH2").value,
    DVCYL2: document.getElementById("DV-CYL2").value,
    DVAxis2: document.getElementById("DV-Axis2").value,
    DVVA2:document.getElementById("DV-VA2").value,
    NVSPH: document.getElementById("NV-SPH").value,
    NVCYL: document.getElementById("NV-CYL").value,
    NVAxis: document.getElementById("NV-Axis").value,
    NVVA: document.getElementById("NV-VA").value,
    NVSPH2: document.getElementById("NV-SPH2").value,
    NVCYL2: document.getElementById("NV-CYL2").value,
    NVAxis2: document.getElementById("NV-Axis2").value,
    NVVA2: document.getElementById("NV-VA2").value,
  };

  console.log(currentPowerGlasses);

  // Save the values in local storage
  localStorage.setItem(
    "currentPowerGlasses",
    JSON.stringify(currentPowerGlasses)
  );

  // Store Eye Examination Table the dictionary name and value
  const eyeExaminationTable = {
    EyelidsR: document.getElementById("EyelidsR").value,
    EyelidsL: document.getElementById("EyelidsL").value,
    ConjunctivaR: document.getElementById("ConjunctivaR").value,
    ConjunctivaL: document.getElementById("ConjunctivaL").value,
    ScleraR: document.getElementById("ScleraR").value,
    ScleraL: document.getElementById("ScleraL").value,
    CorneaR: document.getElementById("CorneaR").value,
    CorneaL: document.getElementById("CorneaL").value,
    AnteriorR: document.getElementById("AnteriorR").value,
    AnteriorL: document.getElementById("AnteriorL").value,
    IrisR: document.getElementById("IrisR").value,
    IrisL: document.getElementById("IrisL").value,
    PupilR: document.getElementById("PupilR").value,
    PupilL: document.getElementById("PupilL").value,
    LensR: document.getElementById("LensR").value,
    LensL: document.getElementById("LensL").value,
    FundusR: document.getElementById("FundusR").value,
    FundusL: document.getElementById("FundusL").value,
  }

  console.log(eyeExaminationTable);

  // Save the values in local storage
  localStorage.setItem(
    "eyeExaminationTable",
    JSON.stringify(eyeExaminationTable)
  );

  // Store Refraction Table the dictionary name and value
  const refractionTable = {
    DistanceSPH : document.getElementsByName("Distance-SPH")[0].value,
    DistanceCYL : document.getElementsByName("Distance-CYL")[0].value,
    DistanceAxis : document.getElementsByName("Distance-Axis")[0].value,
    DistanceVA : document.getElementsByName("Distance-VA")[0].value,
    DistanceSPH2 : document.getElementsByName("Distance-SPH2")[0].value,
    DistanceCYL2 : document.getElementsByName("Distance-CYL2")[0].value,
    DistanceAxis2 : document.getElementsByName("Distance-Axis2")[0].value,
    DistanceVA2 : document.getElementsByName("Distance-VA2")[0].value,
    NearSPH : document.getElementsByName("Near-SPH")[0].value,
    NearCYL : document.getElementsByName("Near-CYL")[0].value,
    NearAxis : document.getElementsByName("Near-Axis")[0].value,
    NearVA : document.getElementsByName("Near-VA")[0].value,
    NearSPH2 : document.getElementsByName("Near-SPH2")[0].value,
    NearCYL2 : document.getElementsByName("Near-CYL2")[0].value,
    NearAxis2 : document.getElementsByName("Near-Axis2")[0].value,
    NearVA2 : document.getElementsByName("Near-VA2")[0].value,
    REIPD : document.getElementById("RE-IPD").value,
    LEIPD : document.getElementById("LE-IPD").value,
    RETypeOfGlass : document.getElementById("RE-TypeOfGlass").value,
    LETypeOfGlass : document.getElementById("LE-TypeOfGlass").value,
    RERemark : document.getElementById("RE-Remark").value,
    LERemark : document.getElementById("LE-Remark").value,
  };

  console.log(refractionTable);

  // Save the values in local storage
  localStorage.setItem(
    "refractionTable",
    JSON.stringify(refractionTable)
  );


   // Store Topography Table the dictionary name and value
   const topographyTable = {
    RightIOP : document.getElementById("Right-IOP").value,
    LeftIOP : document.getElementById("Left-IOP").value,
    RightPachymetry : document.getElementById("Right-Pachymetry").value,
    LeftPachymetry : document.getElementById("Left-Pachymetry").value,
    RightSteepest : document.getElementById("Right-Steepest").value,
    LeftSteepest : document.getElementById("Left-Steepest").value,
    RightFlattest : document.getElementById("Right-Flattest").value,
    LeftFlattest : document.getElementById("Left-Flattest").value,
    RightAv : document.getElementById("Right-Av").value,
    LeftAv : document.getElementById("Left-Av").value,
    RightClyPower : document.getElementById("Right-Cly-Power").value,
    LeftClyPower : document.getElementById("Left-Cly-Power").value,
    RightDegree : document.getElementById("Right-Degree").value,
    LeftDegree : document.getElementById("Left-Degree").value,
    RightKSIKCI : document.getElementById("Right-KSI-KCI").value,
    LeftKSIKCI : document.getElementById("Left-KSI-KCI").value,
    RightSchirmerTest : document.getElementById("Right-Schirmer-Test").value,
    LeftSchirmerTest : document.getElementById("Left-Schirmer-Test").value,
   }

    console.log(topographyTable);

    // Save the values in local storage
    localStorage.setItem(
      "topographyTable",
      JSON.stringify(topographyTable)
    );


    // Store AR Table the dictionary name and value
    const arTable = {
      ARSPH : document.getElementsByName("AR-SPH")[0].value,
      ARCYL : document.getElementsByName("AR-CYL")[0].value,
      ARAxis : document.getElementsByName("AR-Axis")[0].value,
      ARVA : document.getElementsByName("AR-VA")[0].value,
      ARDV : document.getElementsByName("AR-DV")[0].value,
      ARSPH2 : document.getElementsByName("AR-SPH2")[0].value,
      ARCYL2 : document.getElementsByName("AR-CYL2")[0].value,
      ARAxis2 : document.getElementsByName("AR-Axis2")[0].value,
      ARVA2 : document.getElementsByName("AR-VA2")[0].value,
      ARDV2 : document.getElementsByName("AR-DV2")[0].value,
      ARIPD : document.getElementById("AR-IPD").value,
    };

    console.log(arTable);

    // Save the values in local storage
    localStorage.setItem(
      "arTable",
      JSON.stringify(arTable)
    );



   // Get the medicine entries
   const medicineEntries = document.querySelectorAll(".medicine-entry");

   // Store the medicine entries in an array
   const medicines = [];

   // Loop through each medicine entry

   medicineEntries.forEach((entry, index) => {
     const medicineSelect =
       entry.querySelector(".medicine-select").value;
     const medicineDose = entry.querySelector(".medicine-dose").value;
     const medicineQuantity =
       entry.querySelector(".medicine-quantity").value;

     // Store the medicine entry in a dictionary
     const medicine = {
       medicineSelect: medicineSelect,
       medicineDose: medicineDose,
       medicineQuantity: medicineQuantity,
     };

     // Push the medicine entry to the medicines array
     medicines.push(medicine);
   });

   console.log(medicines);

    // Save the medicines array to local storage
    localStorage.setItem("medicines", JSON.stringify(medicines));

   

    // ======== Pre-Operative Workup Investigations Section ==========

    // Store PreOperativeDetails the dictionary name and value
     const PreOperativeDetails = {
      BPResult : document.getElementById("BP-Result").value,
      PulseRate : document.getElementById("Pulse-Rate").value,
      SACResult : document.getElementById("SAC-Result").value,
      NCTResult : document.getElementById("NCT-Result").value,
     }

      console.log(PreOperativeDetails);

      // Save the values in local storage
      localStorage.setItem(
        "PreOperativeDetails",
        JSON.stringify(PreOperativeDetails)
      );


    // Store A-Scan Table the dictionary name and value
    const aScanTable = {
      RightK1 : document.getElementById("Right-K1").value,
      LeftK1 : document.getElementById("Left-K1").value,
      RightK2 : document.getElementById("Right-K2").value,
      LeftK2 : document.getElementById("Left-K2").value,
      RightLT : document.getElementById("Right-LT").value,
      LeftLT : document.getElementById("Left-LT").value,
      RightAL : document.getElementById("Right-AL").value,
      LeftAL : document.getElementById("Left-AL").value,
      RightACD : document.getElementById("Right-ACD").value,
      LeftACD : document.getElementById("Left-ACD").value,
      RightLPower : document.getElementById("Right-LPower").value,
      LeftLPower : document.getElementById("Left-LPower").value,
      RightAConstant : document.getElementById("Right-AConstant").value,
      LeftAConstant : document.getElementById("Left-AConstant").value,
    }

    console.log(aScanTable);

    // Save the values in local storage
    localStorage.setItem(
      "aScanTable",
      JSON.stringify(aScanTable)
    );

    // Store IOP/GAT Table the dictionary name and value
    const iopGatTable = {
      RightmmHg : document.getElementById("Right-mmHg").value,
      RightmmHgTime : document.getElementById("Right-mmHg-Time").value,
      LeftmmHg : document.getElementById("Left-mmHg").value,
      LeftmmHgTime : document.getElementById("Left-mmHg-Time").value,
    }

    console.log(iopGatTable);

    // Save the values in local storage
    localStorage.setItem(
      "iopGatTable",
      JSON.stringify(iopGatTable)
    );


    try {
      const todayDate = getFormattedDate();
      const documentId = `P${appointment.id}${todayDate}`;
      
      const selectedSymptoms = JSON.parse(localStorage.getItem("selectedSymptoms"));
      const selectedMedicalHistory = JSON.parse(localStorage.getItem("selectedMedicalHistory"));
      const selectedSurgicalHistory = JSON.parse(localStorage.getItem("selectedSurgicalHistory"));
      const selectedDiagnosis = JSON.parse(localStorage.getItem("selectedDiagnosis"));
      const selectedInvestigation = JSON.parse(localStorage.getItem("selectedInvestigation"));
      const selectedAdvices = JSON.parse(localStorage.getItem("selectedAdvices"));
      const selectedMedicationTreatment = JSON.parse(localStorage.getItem("selectedMedicationTreatment"));
      const selectedSurgicalTreatment = JSON.parse(localStorage.getItem("selectedSurgicalTreatment"));

  
      // Reference to the document
      const docRef = doc(collection(db, "PatientsHistory"), documentId);
  
      // Prepare the data object by checking each table
      const dataToStore = {
        patientId: appointment.id, // Store patientId
      };
  
      if (!Object.values(visionTable).every(value => value === "")) {
          dataToStore.visionTable = visionTable;
      }
  
      if (!Object.values(currentPowerGlasses).every(value => value === "")) {
          dataToStore.currentPowerGlasses = currentPowerGlasses;
      }
  
      if (!Object.values(eyeExaminationTable).every(value => value === "")) {
          dataToStore.eyeExaminationTable = eyeExaminationTable;
      }
  
      if (!Object.values(refractionTable).every(value => value === "")) {
          dataToStore.refractionTable = refractionTable;
      }
  
      if (!Object.values(topographyTable).every(value => value === "")) {
          dataToStore.topographyTable = topographyTable;
      }

      if (!Object.values(arTable).every(value => value === "")) {
        dataToStore.arTable = arTable;
      }

      if (medicines.length > 0) {
          dataToStore.medicines = medicines;
      }

      if (!Object.values(PreOperativeDetails).every(value => value === "")) {
        dataToStore.PreOperativeDetails = PreOperativeDetails;
      }

      if (!Object.values(aScanTable).every(value => value === "")) {
        dataToStore.aScanTable = aScanTable;
      }

      if (!Object.values(iopGatTable).every(value => value === "")) {
        dataToStore.iopGatTable = iopGatTable;
      }

      if (selectedSymptoms && selectedSymptoms.length > 0) {
        dataToStore.selectedSymptoms = selectedSymptoms;
    }

    if (selectedMedicalHistory && selectedMedicalHistory.length > 0) {
        dataToStore.selectedMedicalHistory = selectedMedicalHistory;
    }

    if (selectedSurgicalHistory && selectedSurgicalHistory.length > 0) {
        dataToStore.selectedSurgicalHistory = selectedSurgicalHistory;
    }

    if (selectedDiagnosis && selectedDiagnosis.length > 0) {
        dataToStore.selectedDiagnosis = selectedDiagnosis;
    }

    if (selectedInvestigation && selectedInvestigation.length > 0) {
        dataToStore.selectedInvestigation = selectedInvestigation;
    }

    if (selectedAdvices && selectedAdvices.length > 0) {
        dataToStore.selectedAdvices = selectedAdvices;
    }

    if (selectedMedicationTreatment && selectedMedicationTreatment.length > 0) {
        dataToStore.selectedMedicationTreatment = selectedMedicationTreatment;
    }

    if (selectedSurgicalTreatment && selectedSurgicalTreatment.length > 0) {
        dataToStore.selectedSurgicalTreatment = selectedSurgicalTreatment;
    }

    

  
      // Only save data if at least one table is not empty
      if (Object.keys(dataToStore).length > 1) {
          dataToStore.timestamp = new Date(); // Add timestamp
          await setDoc(docRef, dataToStore);
          console.log("Data successfully stored in Firestore!");
      } else {
          console.log("No valid data to store. Skipping Firestore save.");
      }
  } catch (error) {
      console.error("Error storing data:", error);
  }
  


  // Open print.html using href
  // window.location.href = "print.html";

  // Open print.html using window.open
   window.open("print.html", "_blank");
  
});



async function getPatientHistory() {
  try {
      const todayDate = getFormattedDate(); // Ensure you have this function
      const documentId = `P${appointment.id}${todayDate}`;
      
      // Reference to the document
      const docRef = doc(db, "PatientsHistory", documentId);
      
      // Fetch the document from Firestore
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          let patientData = docSnap.data();

          // Filter out empty fields
          const filteredData = Object.fromEntries(
              Object.entries(patientData).filter(([key, value]) => 
                  value !== null && value !== undefined && 
                  !(typeof value === "object" && Object.keys(value).length === 0)
              )
          );

          console.log("Retrieved Patient History:", filteredData);

          // ✅ Store each non-empty field in localStorage
          Object.entries(filteredData).forEach(([key, value]) => {
              localStorage.setItem(key, JSON.stringify(value));
          });

          return filteredData;
      } else {
          console.log("No record found for this patient.");
          return null;
      }
  } catch (error) {
      console.error("Error fetching patient history:", error);
  }
}

// Call the function when user clicks the "Get" button
// document.getElementById("getButton").addEventListener("click", getPatientHistory);







async function loadPatientHistory(patientId) {
  try {
      const patientHistoryRef = collection(db, "PatientsHistory"); // Reference to PatientsHistory collection
      const q = query(patientHistoryRef, where("patientId", "==", patientId));
      const querySnapshot = await getDocs(q);

      const historyTable = document.getElementById("visitHistoryTable");
      historyTable.innerHTML = ""; // Clear existing table data

      if (querySnapshot.empty) {
          historyTable.innerHTML = `<tr><td colspan="3">No history present</td></tr>`;
          return;
      }

      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.timestamp.toDate().toLocaleDateString();
          const symptoms = data.selectedSymptoms ? data.selectedSymptoms.join(", ") : "N/A";

          const row = `
              <tr>
                  <td>${date}</td>
                  <td>${symptoms}</td>
                  <td>
                      <button class="btn btn-primary btn-sm" onclick="openSummary('${date}', '${symptoms}')">View Summary</button>
                      <button class="btn btn-primary btn-sm">Get Summary</button>
                  </td>
              </tr>
          `;

          historyTable.innerHTML += row;
      });
  } catch (error) {
      console.error("Error fetching patient history:", error);
  }
}
