 
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

  // function toggleMedicationTreatment(element) {
  //   try {
  //     // Toggle the 'selected' class
  //     element.classList.toggle("selected");
  
  //     // Get all items with the 'selected' class
  //     const selectedItems = Array.from(
  //       document.querySelectorAll(".medication-treatment.selected")
  //     ).map((item) => item.textContent.trim());
  
  //     // Save the selected items to local storage
  //     localStorage.setItem("selectedMedicationTreatment", JSON.stringify(selectedItems));
  
  //     // Log the updated array for debugging
  //     console.log(selectedItems);
  //   } catch (e) {
  //     console.error("An error occurred:", e);
  //   }
  // }

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

  // IndexedDB Setup
const dbName = "medicalOptionsDB";
const storeName = "optionsStore";


function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: ["className", "baseName"] });
      }
    };
  });
}


async function saveOption(baseName, className) {
  openDatabase().then((db) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put({ className, baseName });
  });
  await backupMedicalOptionsDB(); // Call the backup function after saving
}


function getAllOptions() {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
}


async function deleteOption(baseName, className) {
  openDatabase().then((db) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.delete([className, baseName]);
  });
  await backupMedicalOptionsDB(); // Call the backup function after deleting
}


// Add new option (symptom, surgicalHistory, diagnosis)
function addOption(button, className) {
  const inputField = button.previousElementSibling;
  let inputValue = inputField.value.trim();


  if (inputValue === "") {
    window.electronAPI.showErrorBox("Error", "Please enter a new option name.");
    return;
  }


  const optionBE = `${inputValue} (BE)`;
  const optionLE = `${inputValue} (LE)`;
  const optionRE = `${inputValue} (RE)`;
  // Check if the input value already exists in the list
  const existingOptions = document.querySelectorAll(`.${className}`);
  for (let option of existingOptions) {
  const optionText = option.textContent.trim().toLowerCase();
  if (
    optionText === optionBE.toLowerCase() ||
    optionText === optionLE.toLowerCase() ||
    optionText === optionRE.toLowerCase()
  ) {
    window.electronAPI.showErrorBox("Error", "This option already exists.");
    return;
  }
}


  if (className === "symptoms") {
    appendOption(optionBE, "both", inputValue, className);
    appendOption(optionLE, "left", inputValue, className);
    appendOption(optionRE, "right", inputValue, className);
  } else if (className === "surgicalHistory") {
    appendOption(optionBE, "both-surgery-content", inputValue, className);
    appendOption(optionRE, "right-surgery-content", inputValue, className);
    appendOption(optionLE, "left-surgery-content", inputValue, className);
  } else if (className === "diagnosis") {
    appendOption(optionBE, "both-diagnosis-content", inputValue, className);
    appendOption(optionRE, "right-diagnosis-content", inputValue, className);
    appendOption(optionLE, "left-diagnosis-content", inputValue, className);
  }


  saveOption(inputValue, className); // Save permanently
  inputField.value = "";
}


function appendOption(symptomText, sectionId, baseName, className) {
  const optionsContainer = document.querySelector(`#${sectionId} .options-container`);
  const newSymptom = document.createElement("div");
  newSymptom.classList.add(className);
  newSymptom.dataset.baseName = baseName;
  newSymptom.textContent = symptomText;


  newSymptom.addEventListener("click", function () {
    if (className === "symptoms") toggleSymptoms(this);
    else if (className === "surgicalHistory") toggleSurgicalHistory(this);
    else if (className === "diagnosis") toggleDiagnosis(this);
  });


  let clickCount = 0;
  newSymptom.addEventListener("click", function () {
    clickCount++;
    setTimeout(() => { clickCount = 0; }, 500);
    if (clickCount === 3) {
      deleteSymptomFromAllSections(baseName, className);
    }
  });


  optionsContainer.appendChild(newSymptom);
}


function deleteSymptomFromAllSections(baseName, className) {
  document.querySelectorAll(`.${className}`).forEach(symptom => {
    if (symptom.dataset.baseName === baseName) {
      symptom.remove();
    }
  });
  deleteOption(baseName, className);
}


function addOptionFromStorage(baseName, className) {
  const optionBE = `${baseName} (BE)`;
  const optionLE = `${baseName} (LE)`;
  const optionRE = `${baseName} (RE)`;

  // Check if the input value already exists in the list
  const existingOptions = document.querySelectorAll(`.${className}`);
  for (let option of existingOptions) {
      if (option.textContent.trim() === optionBE || option.textContent.trim() === optionLE || option.textContent.trim() === optionRE) {
          return; // Option already exists, no need to add it again
      }
  }

  if (className === "symptoms") {
    appendOption(optionBE, "both", baseName, className);
    appendOption(optionLE, "left", baseName, className);
    appendOption(optionRE, "right", baseName, className);
  } else if (className === "surgicalHistory") {
    appendOption(optionBE, "both-surgery-content", baseName, className);
    appendOption(optionRE, "right-surgery-content", baseName, className);
    appendOption(optionLE, "left-surgery-content", baseName, className);
  } else if (className === "diagnosis") {
    appendOption(optionBE, "both-diagnosis-content", baseName, className);
    appendOption(optionRE, "right-diagnosis-content", baseName, className);
    appendOption(optionLE, "left-diagnosis-content", baseName, className);
  }
}


// Add new medicalHistory, investigation, advice
function addOption2(button, className) {
  const inputField = button.previousElementSibling;
  let inputValue = inputField.value.trim();


  if (inputValue === "") {
    window.electronAPI.showErrorBox("Error", "Please enter a new option name.");
    return;
  }


  const optionInput = `${inputValue}`;


  // Check if the input value already exists in the list
const existingOptions = document.querySelectorAll(`.${className}`);
for (let option of existingOptions) {
  if (option.textContent.trim().toLowerCase() === optionInput.toLowerCase()) {
    window.electronAPI.showErrorBox("Error", "This option already exists.");
    return; // Option already exists, no need to add it again
  }
}



  if (className === "medicalHistory") {
    appendOption2(optionInput, "medical-history-section", inputValue, className);
  } else if (className === "investigation") {
    appendOption2(optionInput, "investigation", inputValue, className);
  } else if (className === "advice") {
    appendOption2(optionInput, "advice", inputValue, className);
  } else if (className === "surgical-treatment") {
    appendOption2(optionInput, "surgical-content", inputValue, className);
  }


  saveOption(inputValue, className);
  inputField.value = "";
}


function appendOption2(symptomText, sectionId, baseName, className) {
  const optionsContainer = document.querySelector(`#${sectionId} .options-container`);
  const newSymptom = document.createElement("div");
  newSymptom.classList.add(className);
  newSymptom.dataset.baseName = baseName;
  newSymptom.textContent = symptomText;


  newSymptom.addEventListener("click", function () {
    if (className === "medicalHistory") toggleMedicalHistory(this);
    else if (className === "investigation") toggleInvestigation(this);
    else if (className === "advice") toggleAdvices(this);
    else if (className === "surgical-treatment") toggleSurgicalTreatment(this);
  });


  let clickCount = 0;
  newSymptom.addEventListener("click", function () {
    clickCount++;
    setTimeout(() => { clickCount = 0; }, 500);
    if (clickCount === 3) {
      deleteSymptomFromAllSections(baseName, className);
    }
  });


  optionsContainer.appendChild(newSymptom);
}


function addOptionFromStorage2(baseName, className) {
  const optionInput = `${baseName}`;

  // Check if the input value already exists in the list
  const existingOptions = document.querySelectorAll(`.${className}`);
  for (let option of existingOptions) {
      if (option.textContent.trim() === optionInput) {
          return; // Option already exists, no need to add it again
      }
  }


  if (className === "medicalHistory") {
    appendOption2(optionInput, "medical-history-section", baseName, className);
  } else if (className === "investigation") {
    appendOption2(optionInput, "investigation", baseName, className);
  } else if (className === "advice") {
    appendOption2(optionInput, "advice", baseName, className);
  } else if (className === "surgical-treatment") {
    appendOption2(optionInput, "surgical-content", baseName, className);
  }
}


// Load from IndexedDB on page load
window.addEventListener("DOMContentLoaded", () => {
  getAllOptions().then(options => {
    options.forEach(({ baseName, className }) => {
      if (["symptoms", "surgicalHistory", "diagnosis"].includes(className)) {
        addOptionFromStorage(baseName, className);
      } else {
        addOptionFromStorage2(baseName, className);
      }
    });
  });
});


async function backupMedicalOptionsDB() {
  const dbName = "medicalOptionsDB";
  const request = indexedDB.open(dbName);

  request.onsuccess = async function(event) {
    const db = event.target.result;
    const backupData = {};
    const transaction = db.transaction(db.objectStoreNames, "readonly");

    transaction.oncomplete = async function() {
      const backupJson = JSON.stringify(backupData, null, 2);

   // Send JSON + dbName to main process to save it
  const result = await window.electronAPI.saveIndexDbBackup(backupJson, dbName);


      if (result.success) {
        console.log(`Backup saved successfully at: ${result.path}`);
      } else {
        console.error(`Failed to save backup: ${result.error}`);
      }
    };

    for (const storeName of db.objectStoreNames) {
      const store = transaction.objectStore(storeName);
      const allRecords = store.getAll();
      allRecords.onsuccess = function(event) {
        backupData[storeName] = event.target.result;
      };
    }
  };

  request.onerror = function(event) {
    console.error("Error opening IndexedDB:", event.target.error);
  };
}


document.addEventListener('keydown', async function (event) {
  if (event.ctrlKey && event.shiftKey && event.key === 'R') {
    event.preventDefault(); // prevent browser reload

    // Optional: Confirm from user before restoring
    const shouldRestore =  await window.electronAPI.showMessageBox(
      "info",
      "Do you want to restore IndexDb the backup?",
      "Restore Backup",
      ["Yes", "No"]
     );
    if (shouldRestore === 1) return; // User clicked "No"

    const restoredData = await window.electronAPI.restoreIndexDbBackup(); // Get backup JSON
    if (restoredData) {
      const { dbName, backupJson } = restoredData;
      console.log(`Restoring ${dbName}...`);  
      await restoreMedicalDB(dbName, backupJson); // Your function to put back into IndexedDB
      window.electronAPI.showSuccessBox("Success", "Backup restored successfully ✅");
      location.reload(); // Reload page to reflect updated data (optional)
    } else {
      window.electronAPI.showErrorBox("Error", "No backup found or failed to restore ❌");
    }
  }
});


async function restoreMedicalDB(dbName, restoredData) {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function(event) {
    const db = event.target.result;

    let storeName = '';
    if (dbName === 'MedicalDB') {
      storeName = 'OptionsStore';
    } else if (dbName === 'medicalOptionsDB') {
      storeName = 'optionsStore';
    } else {
      console.error('Unknown database:', dbName);
      return;
    }

    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const allRecords = store.getAll();
    allRecords.onsuccess = function(event) {
      const existingRecords = event.target.result;
      const existingKeys = new Set(existingRecords.map(record => record.baseName)); // Assuming baseName is unique

      for (const record of restoredData[storeName]) {
        if (!existingKeys.has(record.baseName)) {
          store.add(record);
        }
      }
    };
    transaction.oncomplete = function() {
      console.log('Restoration complete!');
    };
    transaction.onerror = function(event) {
      console.error('Transaction error:', event.target.error);
    };
}

    request.onerror = function(event) {
      console.error('Error opening IndexedDB:', event.target.error);
    };
  }
