 
 // Get the appointment data from localStorage
 const appointment = JSON.parse(window.localStorage.getItem("appointment"));

 if (appointment) {
   // Update the content of the span and h2 tags
   document.getElementById("appointmentId").textContent = appointment.id;
   document.getElementById("appointmentName").textContent = appointment.Name;
 } 

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

  // Function to add a new symptom, surgicalHistory, diagnosis to the list

  function addOption(button, className) {
    const inputField = button.previousElementSibling;
    let inputValue = inputField.value.trim();

    if (inputValue === "") {
      window.electronAPI.showErrorBox("Error", "Please enter a new option name.");
        return;
    }
    console.log(className);

    // Append (BE), (LE), and (RE) to user input
    const optionBE = `${inputValue} (BE)`;
    const optionLE = `${inputValue} (LE)`;
    const optionRE = `${inputValue} (RE)`;

    if (className === "symptoms") {
        // Append symptoms to UI
        appendOption(optionBE, "both", inputValue,className);
        appendOption(optionLE, "left", inputValue,className);
        appendOption(optionRE, "right", inputValue,className);
    }
    else if (className === "surgicalHistory") {
        // Append surgicalHistory to UI
        appendOption(optionBE, "both-surgery-content", inputValue,className);
        appendOption(optionRE, "right-surgery-content", inputValue,className);
        appendOption(optionLE, "left-surgery-content", inputValue,className);
        
    }
    else if (className === "diagnosis") {
        // Append diagnosis to UI
        appendOption(optionBE, "both-diagnosis-content", inputValue,className);
        appendOption(optionRE, "right-diagnosis-content", inputValue,className);
        appendOption(optionLE, "left-diagnosis-content", inputValue,className);
    }

    inputField.value = ""; // Clear input field after adding
}

function appendOption(symptomText, sectionId, baseName,className) {
    const optionsContainer = document.querySelector(`#${sectionId} .options-container`);

    const newSymptom = document.createElement("div");
    newSymptom.classList.add(className);
    newSymptom.dataset.baseName = baseName; // Store base name for deletion
    newSymptom.textContent = symptomText;

    // Attach existing toggleSymptoms function
    newSymptom.addEventListener("click", function() {
      if (className === "symptoms") {
        toggleSymptoms(this); // Calls your existing function
      }
      else if (className === "surgicalHistory") {
        toggleSurgicalHistory(this); // Calls your existing function
      }
      else if (className === "diagnosis") {
        toggleDiagnosis(this); // Calls your existing function
      }
    });

    // Handle triple-click to delete from all sections
    let clickCount = 0;
    newSymptom.addEventListener("click", function(event) {
        clickCount++;
        setTimeout(() => { clickCount = 0; }, 500); // Reset count after 500ms
        
        if (clickCount === 3) {
            deleteSymptomFromAllSections(baseName,className);
        }
    });

    optionsContainer.appendChild(newSymptom);
}

function deleteSymptomFromAllSections(baseName,className) {
    document.querySelectorAll(`.${className}`).forEach(symptom => {
        if (symptom.dataset.baseName === baseName) {
            symptom.remove();
        }
    });
}

// Function to simulate adding symptom via input
function addOptionFromStorage(baseName,className) {
  const optionBE = `${baseName} (BE)`;
  const optionLE = `${baseName} (LE)`;
  const optionRE = `${baseName} (RE)`;

  // Append symptoms to UI
  if (className === "symptoms") {
    appendOption(optionBE, "both", baseName,className);
    appendOption(optionLE, "left", baseName,className);
    appendOption(optionRE, "right", baseName,className);
  }
  else if (className === "surgicalHistory") {
    appendOption(optionBE, "both-surgery-content", baseName,className);
    appendOption(optionRE, "right-surgery-content", baseName,className);
    appendOption(optionLE, "left-surgery-content", baseName,className);
  }
  else if (className === "diagnosis") {
    appendOption(optionBE, "both-diagnosis-content", baseName,className);
    appendOption(optionLE, "right-diagnosis-content", baseName,className);
    appendOption(optionRE, "left-diagnosis-content", baseName,className);
  }
}

// Function to add a new medicalHistory, investigation, advice to the list

function addOption2(button, className) {
  const inputField = button.previousElementSibling;
  let inputValue = inputField.value.trim();

  if (inputValue === "") {
    window.electronAPI.showErrorBox("Error", "Please enter a new option name.");
      return;
  }
  console.log(className);

  // Append options to user input
  const optionInput = `${inputValue}`;
  

  if (className === "medicalHistory") {
      // Append medicalHistory to UI
      appendOption2(optionInput, "medical-history-section", inputValue,className);
  }
  else if (className === "investigation") {
      // Append investigation to UI
      appendOption2(optionInput, "investigation", inputValue,className);
  }
  else if (className === "advice") {
      // Append advice to UI
      appendOption2(optionInput, "advice", inputValue,className);
  }

  inputField.value = ""; // Clear input field after adding
}

function appendOption2(symptomText, sectionId, baseName,className) {
  const optionsContainer = document.querySelector(`#${sectionId} .options-container`);

  const newSymptom = document.createElement("div");
  newSymptom.classList.add(className);
  newSymptom.dataset.baseName = baseName; // Store base name for deletion
  newSymptom.textContent = symptomText;

  // Attach existing toggleSymptoms function
  newSymptom.addEventListener("click", function() {
    if (className === "medicalHistory") {
      toggleMedicalHistory(this); // Calls your existing function
    }
    else if (className === "investigation") {
      toggleInvestigation(this); // Calls your existing function
    }
    else if (className === "advice") {
      toggleAdvices(this); // Calls your existing function
    }
  });

  // Handle triple-click to delete from all sections
  let clickCount = 0;
  newSymptom.addEventListener("click", function(event) {
      clickCount++;
      setTimeout(() => { clickCount = 0; }, 500); // Reset count after 500ms
      
      if (clickCount === 3) {
          deleteSymptomFromAllSections(baseName,className);
      }
  });

  optionsContainer.appendChild(newSymptom);
}

// Function to simulate adding symptom via input
function addOptionFromStorage2(baseName,className) {
const optionInput = `${baseName}`;

  // Append symptoms to UI
  if (className === "medicalHistory") {
    appendOption2(optionInput, "medical-history-section", baseName,className);
  }
  else if (className === "investigation") {
    appendOption2(optionInput, "investigation", baseName,className);
  }
  else if (className === "advice") {
    appendOption2(optionInput, "advice", baseName,className);
  }
}