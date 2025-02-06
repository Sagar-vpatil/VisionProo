 
 // Get the appointment data from localStorage
 const appointment = JSON.parse(window.localStorage.getItem("appointment"));

 if (appointment) {
   // Update the content of the span and h2 tags
   document.getElementById("appointmentId").textContent = appointment.id;
   document.getElementById("appointmentName").textContent = appointment.Name;
 } 
// Dom event listener when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Clear the selectedSymptoms from local storage
  localStorage.removeItem("selectedSymptoms");
  localStorage.removeItem("selectedDiagnosis");
  localStorage.removeItem("selectedMedicalHistory");
  localStorage.removeItem("selectedSurgicalHistory");
  localStorage.removeItem("selectedInvestigation");
  localStorage.removeItem("selectedAdvices");
  localStorage.removeItem("selectedMedicationTreatment");
  localStorage.removeItem("selectedSurgicalTreatment");
});

// Toggle selection for symptoms, medical history, and surgical history
function toggleSymptoms(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".symptoms.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedSymptoms", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }

  function toggleMedicalHistory(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".medicalHistory.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedMedicalHistory", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }


  function toggleSurgicalHistory(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".surgicalHistory.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedSurgicalHistory", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }



  function toggleDiagnosis(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".diagnosis.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedDiagnosis", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }

  function toggleInvestigation(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".investigation.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedInvestigation", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }


  function toggleAdvices(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".advice.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedAdvices", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }

  function toggleMedicationTreatment(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".medication-treatment.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedMedicationTreatment", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }

  function toggleSurgicalTreatment(element) {
    try {
      // Toggle the 'selected' class
      element.classList.toggle("selected");
  
      // Get all items with the 'selected' class
      const selectedItems = Array.from(
        document.querySelectorAll(".surgical-treatment.selected")
      ).map((item) => item.textContent.trim());
  
      // Save the selected items to local storage
      localStorage.setItem("selectedSurgicalTreatment", JSON.stringify(selectedItems));
  
      // Log the updated array for debugging
      console.log(selectedItems);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }

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
  
document.getElementById("print-btn").addEventListener("click", function () {
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


  // Open print.html using href
  // window.location.href = "print.html";

  // Open print.html using window.open
   window.open("print.html", "_blank");
  
});
 