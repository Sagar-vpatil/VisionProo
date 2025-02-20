 // This file contains the code to add a patient to the Firestore database.
import { db, collection, addDoc, getDocs, query, orderBy, limit, setDoc, doc, where, getDoc} from "./firebaseConfig.js";




// Dom event listener when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load the patient history when the page is loaded
  loadPatientHistory(appointment.id);

  loadPatientPdfRecords("P"+appointment.id);

   // Remove the Local Storage variable openHistory_Status
   localStorage.removeItem("openHistory");
   // get Local Storage variable openHistory to Active or not
    const openHistory = localStorage.getItem("openHistory_Status");
    console.log(openHistory);
    if (!openHistory || !openHistory === "Active") {
      // Clear the selectedSymptoms from local storage
      console.log("Clearing local storage");
      localStorage.removeItem("selectedSymptoms");
      localStorage.removeItem("selectedDiagnosis");
      localStorage.removeItem("selectedMedicalHistory");
      localStorage.removeItem("selectedSurgicalHistory");
      localStorage.removeItem("selectedInvestigation");
      localStorage.removeItem("selectedAdvices");
      localStorage.removeItem("selectedMedicationTreatment");
      localStorage.removeItem("selectedSurgicalTreatment");
      localStorage.removeItem("tempDate");
    }
    else {
      // Load the patient history when the page is loaded
      loadPatientHistoryData();

      const tempDate = localStorage.getItem("tempDate");
      console.log(tempDate);

      // show historyAlert
      document.getElementById("historyAlert").style.display = "flex";

      // Update the alert message
      document.getElementById("alertMessage").textContent = `Patient History Opened of Date: ${tempDate}`;

    }
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

  document.getElementById("RightmmHgTime").addEventListener("focus", function () {
    this.value = getCurrentTime();
  });

  document.getElementById("LeftmmHgTime").addEventListener("focus", function () {
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


document.getElementById("only-print-btn").addEventListener("click",async function () {
  const setCondition = "onlyPrint";
  savePatientHistory(setCondition);
  
  
});
  
document.getElementById("print-btn").addEventListener("click",async function () {
  const setCondition = "saveAndPrint";
  savePatientHistory(setCondition);
  
  
});


async function savePatientHistory(getCondition) {
  // Store Vision Table the dictionary name and value
  const visionTable = {
    UnaidedR : document.getElementById("UnaidedR").value,
    UnaidedL : document.getElementById("UnaidedL").value,
    GlassesR : document.getElementById("GlassesR").value,
    GlassesL : document.getElementById("GlassesL").value,
    NearVisionR : document.getElementById("NearVisionR").value,
    NearVisionL : document.getElementById("NearVisionL").value,
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
    DVSPH: document.getElementById("DVSPH").value,
    DVCYL: document.getElementById("DVCYL").value,
    DVAxis:document.getElementById("DVAxis").value,
    DVVA: document.getElementById("DVVA").value,
    DVSPH2: document.getElementById("DVSPH2").value,
    DVCYL2: document.getElementById("DVCYL2").value,
    DVAxis2: document.getElementById("DVAxis2").value,
    DVVA2:document.getElementById("DVVA2").value,
    NVSPH: document.getElementById("NVSPH").value,
    NVCYL: document.getElementById("NVCYL").value,
    NVAxis: document.getElementById("NVAxis").value,
    NVVA: document.getElementById("NVVA").value,
    NVSPH2: document.getElementById("NVSPH2").value,
    NVCYL2: document.getElementById("NVCYL2").value,
    NVAxis2: document.getElementById("NVAxis2").value,
    NVVA2: document.getElementById("NVVA2").value,
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
    DistanceSPH : document.getElementsByName("DistanceSPH")[0].value,
    DistanceCYL : document.getElementsByName("DistanceCYL")[0].value,
    DistanceAxis : document.getElementsByName("DistanceAxis")[0].value,
    DistanceVA : document.getElementsByName("DistanceVA")[0].value,
    DistanceSPH2 : document.getElementsByName("DistanceSPH2")[0].value,
    DistanceCYL2 : document.getElementsByName("DistanceCYL2")[0].value,
    DistanceAxis2 : document.getElementsByName("DistanceAxis2")[0].value,
    DistanceVA2 : document.getElementsByName("DistanceVA2")[0].value,
    NearSPH : document.getElementsByName("NearSPH")[0].value,
    NearCYL : document.getElementsByName("NearCYL")[0].value,
    NearAxis : document.getElementsByName("NearAxis")[0].value,
    NearVA : document.getElementsByName("NearVA")[0].value,
    NearSPH2 : document.getElementsByName("NearSPH2")[0].value,
    NearCYL2 : document.getElementsByName("NearCYL2")[0].value,
    NearAxis2 : document.getElementsByName("NearAxis2")[0].value,
    NearVA2 : document.getElementsByName("NearVA2")[0].value,
    REIPD : document.getElementById("REIPD").value,
    LEIPD : document.getElementById("LEIPD").value,
    RETypeOfGlass : document.getElementById("RETypeOfGlass").value,
    LETypeOfGlass : document.getElementById("LETypeOfGlass").value,
    RERemark : document.getElementById("RERemark").value,
    LERemark : document.getElementById("LERemark").value,
  };

  console.log(refractionTable);

  // Save the values in local storage
  localStorage.setItem(
    "refractionTable",
    JSON.stringify(refractionTable)
  );


   // Store Topography Table the dictionary name and value
   const topographyTable = {
    RightIOP : document.getElementById("RightIOP").value,
    LeftIOP : document.getElementById("LeftIOP").value,
    RightPachymetry : document.getElementById("RightPachymetry").value,
    LeftPachymetry : document.getElementById("LeftPachymetry").value,
    RightSteepest : document.getElementById("RightSteepest").value,
    LeftSteepest : document.getElementById("LeftSteepest").value,
    RightFlattest : document.getElementById("RightFlattest").value,
    LeftFlattest : document.getElementById("LeftFlattest").value,
    RightAv : document.getElementById("RightAv").value,
    LeftAv : document.getElementById("LeftAv").value,
    RightClyPower : document.getElementById("RightClyPower").value,
    LeftClyPower : document.getElementById("LeftClyPower").value,
    RightDegree : document.getElementById("RightDegree").value,
    LeftDegree : document.getElementById("LeftDegree").value,
    RightKSIKCI : document.getElementById("RightKSIKCI").value,
    LeftKSIKCI : document.getElementById("LeftKSIKCI").value,
    RightSchirmerTest : document.getElementById("RightSchirmerTest").value,
    LeftSchirmerTest : document.getElementById("LeftSchirmerTest").value,
   }

    console.log(topographyTable);

    // Save the values in local storage
    localStorage.setItem(
      "topographyTable",
      JSON.stringify(topographyTable)
    );


    // Store AR Table the dictionary name and value
    const arTable = {
      ARSPH : document.getElementsByName("ARSPH")[0].value,
      ARCYL : document.getElementsByName("ARCYL")[0].value,
      ARAxis : document.getElementsByName("ARAxis")[0].value,
      ARVA : document.getElementsByName("ARVA")[0].value,
      ARDV : document.getElementsByName("ARDV")[0].value,
      ARSPH2 : document.getElementsByName("ARSPH2")[0].value,
      ARCYL2 : document.getElementsByName("ARCYL2")[0].value,
      ARAxis2 : document.getElementsByName("ARAxis2")[0].value,
      ARVA2 : document.getElementsByName("ARVA2")[0].value,
      ARDV2 : document.getElementsByName("ARDV2")[0].value,
      ARIPD : document.getElementById("ARIPD").value,
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
      BPResult : document.getElementById("BPResult").value,
      PulseRate : document.getElementById("PulseRate").value,
      SACResult : document.getElementById("SACResult").value,
      NCTResult : document.getElementById("NCTResult").value,
     }

      console.log(PreOperativeDetails);

      // Save the values in local storage
      localStorage.setItem(
        "PreOperativeDetails",
        JSON.stringify(PreOperativeDetails)
      );


    // Store A-Scan Table the dictionary name and value
    const aScanTable = {
      RightK1 : document.getElementById("RightK1").value,
      LeftK1 : document.getElementById("LeftK1").value,
      RightK2 : document.getElementById("RightK2").value,
      LeftK2 : document.getElementById("LeftK2").value,
      RightLT : document.getElementById("RightLT").value,
      LeftLT : document.getElementById("LeftLT").value,
      RightAL : document.getElementById("RightAL").value,
      LeftAL : document.getElementById("LeftAL").value,
      RightACD : document.getElementById("RightACD").value,
      LeftACD : document.getElementById("LeftACD").value,
      RightLPower : document.getElementById("RightLPower").value,
      LeftLPower : document.getElementById("LeftLPower").value,
      RightAConstant : document.getElementById("RightAConstant").value,
      LeftAConstant : document.getElementById("LeftAConstant").value,
      RightIOL : document.getElementById("RightIOL").value,
      LeftIOL : document.getElementById("LeftIOL").value,
    }

    console.log(aScanTable);

    // Save the values in local storage
    localStorage.setItem(
      "aScanTable",
      JSON.stringify(aScanTable)
    );

    // Store IOP/GAT Table the dictionary name and value
    const iopGatTable = {
      RightmmHg : document.getElementById("RightmmHg").value,
      RightmmHgTime : document.getElementById("RightmmHgTime").value,
      LeftmmHg : document.getElementById("LeftmmHg").value,
      LeftmmHgTime : document.getElementById("LeftmmHgTime").value,
    }

    console.log(iopGatTable);

    // Save the values in local storage
    localStorage.setItem(
      "iopGatTable",
      JSON.stringify(iopGatTable)
    );
    

   if (getCondition === "saveAndPrint") {
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

  // Remove the Local Storage variable openHistory_Status
  localStorage.removeItem("openHistory_Status");
}
  


  // Open print.html using href
  window.location.href = "print.html";

  // Open print.html using window.open
  //  window.open("print.html", "_blank");
}



async function getPatientHistory(date) {
  try {
      
      const getDate = date.split("/");
      const documentId = `P${appointment.id}${getDate[0]}${getDate[1]}${getDate[2]}`;
      
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
          const symptoms = JSON.parse(localStorage.getItem("selectedSymptoms")) || [];
          console.log("Symptoms:", symptoms); 

      } else {
          console.log("No record found for this patient.");
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
          const date = data.timestamp.toDate().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          const symptoms = data.selectedSymptoms ? data.selectedSymptoms.join(", ") : "N/A";
          const patientId = data.patientId;

          const row = `
              <tr>
                  <td>${date}</td>
                  <td>${symptoms}</td>
                  <td>
                      <button class="btn btn-primary btn-sm" onclick="openSummary('${date}', '${symptoms}')">View Summary</button>
                      <button class="btn btn-primary btn-sm open-history" data-date="${date}">Open History</button>
                  </td>
              </tr>
          `;

          historyTable.innerHTML += row;
      });
       // Attach event listeners AFTER elements are created
       document.querySelectorAll(".open-history").forEach(button => {
        button.addEventListener("click", function () {
            const date = this.getAttribute("data-date");
            openPatientHistory(date);
        });
    });
  } catch (error) {
      console.error("Error fetching patient history:", error);
  }
}

async function openPatientHistory(date) {
  const alertBox = document.getElementById("historyAlert");
  const alertMessage = document.getElementById("alertMessage");

  // Set Local Storage variable openHistory_Status to Active
  localStorage.setItem("openHistory_Status", "Active");
  console.log(date);

  // Get the patient history from Firestore
  await getPatientHistory(date);
  loadPatientHistoryData();

  localStorage.setItem("tempDate", date);


  // Update the alert message
  alertMessage.textContent = `Patient History Opened of Date: ${date}`;

  // Show the alert box
  alertBox.style.display = "flex";
}

document.getElementById("closeHistory-btn").addEventListener("click",async function () {
  // Hide the alert box
  document.getElementById("historyAlert").style.display = "none";
  // Remove the Local Storage variable openHistory_Status
  localStorage.removeItem("openHistory_Status");
  // reload the page
  location.reload();
});

function loadPatientHistoryData() {
  try {
    // Retrieve selected symptoms from localStorage
    const selectedSymptoms = JSON.parse(localStorage.getItem("selectedSymptoms")) || [];
    const selectedMedicalHistory = JSON.parse(localStorage.getItem("selectedMedicalHistory")) || [];
    const selectedSurgicalHistory = JSON.parse(localStorage.getItem("selectedSurgicalHistory")) || [];
    const selectedDiagnosis = JSON.parse(localStorage.getItem("selectedDiagnosis")) || [];
    const selectedInvestigation = JSON.parse(localStorage.getItem("selectedInvestigation")) || [];
    const selectedAdvices = JSON.parse(localStorage.getItem("selectedAdvices")) || [];
    const selectedMedicationTreatment = JSON.parse(localStorage.getItem("selectedMedicationTreatment")) || [];
    const selectedSurgicalTreatment = JSON.parse(localStorage.getItem("selectedSurgicalTreatment")) || [];

    const visionTable = JSON.parse(localStorage.getItem("visionTable")) || {};
    const currentPowerGlasses = JSON.parse(localStorage.getItem("currentPowerGlasses")) || {};
    const eyeExaminationTable = JSON.parse(localStorage.getItem("eyeExaminationTable")) || {};
    const refractionTable = JSON.parse(localStorage.getItem("refractionTable")) || {};
    const topographyTable = JSON.parse(localStorage.getItem("topographyTable")) || {};
    const arTable = JSON.parse(localStorage.getItem("arTable")) || {};
    const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
    const PreOperativeDetails = JSON.parse(localStorage.getItem("PreOperativeDetails")) || {};
    const aScanTable = JSON.parse(localStorage.getItem("aScanTable")) || {};
    const iopGatTable = JSON.parse(localStorage.getItem("iopGatTable")) || {};



    console.log("Selected Symptoms:", selectedSymptoms);


    // If there are selected symptoms, update the UI
    selectedSymptoms.forEach((symptom) => {
      const symptomElement = Array.from(document.querySelectorAll(".symptoms"))
        .find((item) => item.textContent.trim() === symptom);
      
      if (symptomElement) {
        symptomElement.classList.add("selected");
      }
    });

    // If there are selected medical history, update the UI
    selectedMedicalHistory.forEach((medicalHistory) => {
      const medicalHistoryElement = Array.from(document.querySelectorAll(".medicalHistory"))
        .find((item) => item.textContent.trim() === medicalHistory);
      
      if (medicalHistoryElement) {
        medicalHistoryElement.classList.add("selected");
      }
    });

    // If there are selected surgical history, update the UI
    selectedSurgicalHistory.forEach((surgicalHistory) => {
      const surgicalHistoryElement = Array.from(document.querySelectorAll(".surgicalHistory"))
        .find((item) => item.textContent.trim() === surgicalHistory);
      
      if (surgicalHistoryElement) {
        surgicalHistoryElement.classList.add("selected");
      }
    });

    // If there are selected diagnosis, update the UI
    selectedDiagnosis.forEach((diagnosis) => {
      const diagnosisElement = Array.from(document.querySelectorAll(".diagnosis"))
        .find((item) => item.textContent.trim() === diagnosis);
      
      if (diagnosisElement) {
        diagnosisElement.classList.add("selected");
      }
    });

    // If there are selected investigation, update the UI
    selectedInvestigation.forEach((investigation) => {
      const investigationElement = Array.from(document.querySelectorAll(".investigation"))
        .find((item) => item.textContent.trim() === investigation);
      
      if (investigationElement) {
        investigationElement.classList.add("selected");
      }
    });

    // If there are selected advices, update the UI
    selectedAdvices.forEach((advice) => {
      const adviceElement = Array.from(document.querySelectorAll(".advice"))
        .find((item) => item.textContent.trim() === advice);
      
      if (adviceElement) {
        adviceElement.classList.add("selected");
      }
    });

    // If there are selected medication treatment, update the UI
    selectedMedicationTreatment.forEach((medicationTreatment) => {
      const medicationTreatmentElement = Array.from(document.querySelectorAll(".medication-treatment"))
        .find((item) => item.textContent.trim() === medicationTreatment);
      
      if (medicationTreatmentElement) {
        medicationTreatmentElement.classList.add("selected");
      }
    });

    // If there are selected surgical treatment, update the UI
    selectedSurgicalTreatment.forEach((surgicalTreatment) => {
      const surgicalTreatmentElement = Array.from(document.querySelectorAll(".surgical-treatment"))
        .find((item) => item.textContent.trim() === surgicalTreatment);
      
      if (surgicalTreatmentElement) {
        surgicalTreatmentElement.classList.add("selected");
      }
    });

    // Update the vision table
    for (const key in visionTable) {
      const element = document.getElementById(key);
      if (element) {
        element.value = visionTable[key];
      }
    }

    // Update the current power glasses table
    for (const key in currentPowerGlasses) {
      const element = document.getElementById(key);
      if (element) {
        element.value = currentPowerGlasses[key];
      }
    }

    // Update the eye examination table
    for (const key in eyeExaminationTable) {
      const element = document.getElementById(key);
      if (element) {
        element.value = eyeExaminationTable[key];
      }
    }

    // Update the refraction table
    for (const key in refractionTable) {
      const element = document.getElementsByName(key)[0];
      if (element) {
        element.value = refractionTable[key];
      }
    }

    // Update the topography table
    for (const key in topographyTable) {
      const element = document.getElementById(key);
      if (element) {
        element.value = topographyTable[key];
      }
    }

    // Update the ar table
    for (const key in arTable) {
      const element = document.getElementsByName(key)[0];
      if (element) {
        element.value = arTable[key];
      }
    }

    // Update the medicines 
    console.log("Loaded Medicines:", storedMedicines);
  
    const medicineContainer = document.getElementById("medicine-list");
  
    storedMedicines.forEach((medicine) => {
      const entry = document.createElement("div");
      entry.classList.add("medicine-entry");
  
      entry.innerHTML = `
        <select class="medicine-select">
          <option value="${medicine.medicineSelect}" selected>${medicine.medicineSelect}</option>
        </select>
        <input type="text" class="medicine-dose" value="${medicine.medicineDose}" />
        <input type="number" class="medicine-quantity" value="${medicine.medicineQuantity}" />
         <button type="button" class="remove-btn">Remove</button>
      `;
  
      medicineContainer.appendChild(entry);
      // Add event listener to remove button
      entry.querySelector(".remove-btn").addEventListener("click", function () {
        entry.remove();
      });
    });

    // Update the PreOperativeDetails table
    for (const key in PreOperativeDetails) {
      const element = document.getElementById(key);
      if (element) {
        element.value = PreOperativeDetails[key];
      }
    }

    // Update the aScan table
    for (const key in aScanTable) {
      const element = document.getElementById(key);
      if (element) {
        element.value = aScanTable[key];
      }
    }

    // Update the iopGat table
    for (const key in iopGatTable) {
      const element = document.getElementById(key);
      if (element) {
        element.value = iopGatTable[key];
      }
    }
    

  } catch (e) {
    console.error("An error occurred while loading patient history data", e);
  }
}


async function loadPatientPdfRecords(patientId) {
  const records = await window.electronAPI.getPatientPdfRecords(patientId);
  const tableBody = document.getElementById("pdfHistoryTable");
  tableBody.innerHTML = ""; // Clear old records

  if (records.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='3'>No records found</td></tr>";
      return;
  }

  // Group records by date
  const groupedRecords = {};
  records.forEach(record => {
      if (!groupedRecords[record.date]) {
          groupedRecords[record.date] = [];
      }
      groupedRecords[record.date].push(...record.pdfs);
  });

  // Create rows for each date
  Object.keys(groupedRecords).forEach(date => {
      const pdfs = groupedRecords[date];
      let row = document.createElement("tr"); // Use 'let' to allow reassignment

      // Create the date cell with rowspan
      const dateCell = document.createElement("td");
      dateCell.textContent = date;
      dateCell.setAttribute("rowspan", pdfs.length);
      row.appendChild(dateCell);

      // Create cells for each PDF
      pdfs.forEach((pdf, index) => {
          if (index > 0) {
              // For subsequent PDFs, create a new row
              row = document.createElement("tr");
          }

          // PDF Name Cell
          const pdfCell = document.createElement("td");
          const pdfLink = document.createElement("a");
          pdfLink.href = "#";
          pdfLink.classList.add("pdf-link");
          pdfLink.setAttribute("data-path", pdf.path);
          pdfLink.textContent = pdf.name;
          pdfCell.appendChild(pdfLink);
          row.appendChild(pdfCell);

          // Delete Button Cell
          const deleteCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("btn", "btn-danger", "delete-button");
          deleteButton.setAttribute("data-path", pdf.path);
          deleteCell.appendChild(deleteButton);
          row.appendChild(deleteCell);

          tableBody.appendChild(row);
      });
  });

  // Add event listeners to dynamically generated PDF links
  document.querySelectorAll(".pdf-link").forEach(link => {
      link.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent default anchor action
          const pdfPath = event.target.getAttribute("data-path");
          window.electronAPI.openPdf(pdfPath);
      });
  });

  // Add event listeners to dynamically generated delete buttons
  document.querySelectorAll(".delete-button").forEach(button => {
      button.addEventListener("click", async(event) => {
          const pdfPath = event.target.getAttribute("data-path");
          const response = await window.electronAPI.showMessageBox(
            "warning",
            "Are you sure you want to delete this PDF?",
            "Delete PDF",
            ["Yes", "No"]
           );
        
          if (response === 1) {
              return;
          }
          
              window.electronAPI.deletePdf(pdfPath).then(() => {
                  // Reload the records after deletion
                  loadPatientPdfRecords(patientId);
              }).catch(error => {
                  console.error("Error deleting PDF:", error);
              });
          
      });
  });
}