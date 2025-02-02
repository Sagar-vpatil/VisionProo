 
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
  
document.getElementById("print-btn").addEventListener("click", function () {
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

  // Open print.html using href
  window.location.href = "print.html";

  // Open print.html using window.open
  //  window.open("print.html", "_blank");
  
});
 