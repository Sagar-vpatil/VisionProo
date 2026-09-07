 
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


const examSectionMap = {
    eyelids: "exam-eyelids",
    conjunctiva: "exam-conjunctiva",
    sclera: "exam-sclera",
    cornea: "exam-cornea",
    lens: "exam-lens",
    anterior: "exam-anterior",
    iris: "exam-iris",
    pupil: "exam-pupil",
    fundus: "exam-fundus"
};


const examPopupMap = {
    eyelids: "eyelidsOptions",
    conjunctiva: "conjunctivaOptions",
    sclera: "scleraOptions",
    cornea: "corneaOptions",
    lens: "lensOptions",
    anterior: "anteriorOptions",
    iris: "irisOptions",
    pupil: "pupilOptions",
    fundus: "fundusOptions"
};


const examInputSectionMap = {
    "eyelids-input": "eyelids",
    "conjunctiva-input": "conjunctiva",
    "sclera-input": "sclera",
    "cornea-input": "cornea",
    "lens-input": "lens",
    "anterior-input": "anterior",
    "iris-input": "iris",
    "pupil-input": "pupil",
    "fundus-input": "fundus"
};

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

// Save option to IndexedDB and backup
async function saveOption(baseName, className) {

    if (!baseName || !className) {
        throw new Error(
            "Option name and class name are required."
        );
    }

    const db = await openDatabase();

    await new Promise((resolve, reject) => {

        const tx = db.transaction(
            storeName,
            "readwrite"
        );

        const store = tx.objectStore(
            storeName
        );

        store.put({
            className,
            baseName
        });

        tx.oncomplete = resolve;

        tx.onerror = () => {
            reject(
                tx.error ||
                new Error("Failed to save option.")
            );
        };

        tx.onabort = () => {
            reject(
                tx.error ||
                new Error("Option save transaction aborted.")
            );
        };

    });

    // Backup only after IndexedDB transaction succeeds
    await backupMedicalOptionsDB();

    console.log(
        "Option saved and backed up successfully:",
        {
            className,
            baseName
        }
    );
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


// ============= Examination Options Manager =============

window.addEventListener("DOMContentLoaded", () => {

    // EXAMINATION OPTIONS MANAGER ELEMENTS

    const manageExamOptionsBtn =
        document.getElementById("manageExamOptionsBtn");

    const examOptionsModal =
        document.getElementById("examOptionsModal");

    const closeExamOptionsModal =
        document.getElementById("closeExamOptionsModal");

    const examSectionSelect =
        document.getElementById("examSectionSelect");

    const newExamOption =
        document.getElementById("newExamOption");

    const addExamOptionBtn =
        document.getElementById("addExamOptionBtn");

    const existingOptionsList =
        document.getElementById("existingOptionsList");


    // CHECK REQUIRED ELEMENTS

    if (
        !manageExamOptionsBtn ||
        !examOptionsModal ||
        !closeExamOptionsModal ||
        !examSectionSelect ||
        !newExamOption ||
        !addExamOptionBtn ||
        !existingOptionsList
    ) {

        console.warn(
            "Examination Options Manager elements not found."
        );

        return;
    }


    console.log(
        "Examination Options Manager loaded."
    );


    // OPEN MANAGE EXAMINATION OPTIONS MODAL

    manageExamOptionsBtn.addEventListener(
        "click",
        function () {

            console.log(
                "Manage Examination Options button clicked."
            );

            examOptionsModal.style.display = "block";


            // Load options if a section is already selected

            const section =
                examSectionSelect.value;


            if (section) {

                loadExaminationOptions(section);

            } else {

                existingOptionsList.innerHTML =
                    "<p>Select an examination section.</p>";

            }

        }
    );


    // CLOSE MODAL - CLOSE BUTTON

    closeExamOptionsModal.addEventListener(
        "click",
        function () {

            examOptionsModal.style.display = "none";

        }
    );


    // CLOSE MODAL - CLICK OUTSIDE

    examOptionsModal.addEventListener(
        "click",
        function (event) {

            if (event.target === examOptionsModal) {

                examOptionsModal.style.display = "none";

            }

        }
    );


    // SECTION SELECTION

    examSectionSelect.addEventListener(
        "change",
        function () {

            const section =
                this.value;


            console.log(
                "Selected examination section:",
                section
            );


            if (!section) {

                existingOptionsList.innerHTML =
                    "<p>Select an examination section.</p>";

                return;
            }


            loadExaminationOptions(section);

        }
    );


    // ADD NEW EXAMINATION OPTION

    addExamOptionBtn.addEventListener(
        "click",
        async function () {

            try {

                const section =
                    examSectionSelect.value;


                const optionValue =
                    newExamOption.value.trim();


                // Validate section

                if (!section) {

                    window.electronAPI.showErrorBox(
                        "Error",
                        "Please select an examination section."
                    );

                    return;
                }


                // Validate option

                if (!optionValue) {

                    window.electronAPI.showErrorBox(
                        "Error",
                        "Please enter an option name."
                    );

                    newExamOption.focus();

                    return;
                }


                // Get IndexedDB class name

                const className =
                    examSectionMap[section];


                if (!className) {

                    console.error(
                        "Invalid examination section:",
                        section
                    );

                    window.electronAPI.showErrorBox(
                        "Error",
                        "Invalid examination section."
                    );

                    return;
                }


                console.log(
                    "Adding examination option:",
                    {
                        section: section,
                        className: className,
                        option: optionValue
                    }
                );


                // Get existing options

                const allOptions =
                    await getAllOptions();


                // Check duplicate

                const alreadyExists =
                    allOptions.some(option => {

                        return (
                            option.className === className &&
                            option.baseName &&
                            option.baseName
                                .trim()
                                .toLowerCase() ===
                            optionValue.toLowerCase()
                        );

                    });


                if (alreadyExists) {

                    window.electronAPI.showErrorBox(
                        "Error",
                        "This option already exists."
                    );

                    return;
                }


                // Save option

                await saveOption(
                    optionValue,
                    className
                );


                console.log(
                    "Examination option saved successfully."
                );


                // Clear input

                newExamOption.value = "";


                // Reload option list

                await loadExaminationOptions(
                    section
                );


                // Success message

                window.electronAPI.showSuccessBox(
                    "Success",
                    "Examination option added successfully."
                );


            } catch (error) {

                console.error(
                    "Error adding examination option:",
                    error
                );


                window.electronAPI.showErrorBox(
                    "Error",
                    "Unable to add examination option."
                );

            }

        }
    );


    // ENTER KEY SUPPORT

    newExamOption.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                addExamOptionBtn.click();

            }

        }
    );


});


// Load Examination Options into Manage Examination Options modal

async function loadExaminationOptions(section) {

    const existingOptionsList =
        document.getElementById(
            "existingOptionsList"
        );


    if (!existingOptionsList) {
        return;
    }


    // Clear current list

    existingOptionsList.innerHTML =
        "<p>Loading...</p>";


    try {

        // Get existing records from medicalOptionsDB

        const allOptions =
            await getAllOptions();


        // Convert dropdown value into
        // examination className

        const className =
            examSectionMap[section];


        // Safety check

        if (!className) {

            existingOptionsList.innerHTML =
                "<p>Invalid examination section.</p>";

            return;
        }


        // Only get options belonging
        // to the selected examination section

        const examOptions =
            allOptions.filter(option =>
                option.className === className
            );


        console.log(
            `Custom options for ${section}:`,
            examOptions
        );


        // No custom options

        if (examOptions.length === 0) {

            existingOptionsList.innerHTML =
                "<p>No custom options added yet.</p>";

            return;
        }


        // Clear loading message

        existingOptionsList.innerHTML = "";


        // DISPLAY CUSTOM OPTIONS

        examOptions.forEach(option => {

            const optionElement =
                document.createElement("div");

            optionElement.className =
                "exam-option-item";


            const optionText =
                document.createElement("span");

            optionText.textContent =
                option.baseName;


            optionElement.appendChild(
                optionText
            );


            // TRIPLE CLICK DELETE
        
            let clickCount = 0;
            let clickTimer = null;


            optionElement.addEventListener(
                "click",
                async function () {

                    clickCount++;


                    // Triple click detected

                    if (clickCount === 3) {

                        clearTimeout(clickTimer);

                        clickCount = 0;


                        // Safety check:
                        // only examination options can be deleted

                        if (
                            !option.className ||
                            !option.className.startsWith(
                                "exam-"
                            )
                        ) {

                            console.warn(
                                "Delete blocked:",
                                option
                            );

                            return;
                        }


                        const response = await window.electronAPI.showMessageBox(
                            "warning",
                            `Delete "${option.baseName}"?`,
                            "Confirm",
                            ["Yes", "No"]
                        );

                        if (response === 1) {
                            return;
                        }


                        // Delete from IndexedDB

                        deleteOption(
                            option.baseName,
                            option.className
                        )
                        .then(async () => {

                            console.log(
                                "Examination option deleted:",
                                option.baseName
                            );


                            // Reload Manage Examination
                            // Options list

                            await loadExaminationOptions(
                                section
                            );


                            // Reload corresponding
                            // Eye Examination popup

                            await loadCustomExaminationOptions(
                                section
                            );


                            window.electronAPI.showSuccessBox(
                                "Success",
                                "Examination option deleted successfully."
                            );

                        })
                        .catch(error => {

                            console.error(
                                "Error deleting examination option:",
                                error
                            );


                            window.electronAPI.showErrorBox(
                                "Error",
                                "Unable to delete examination option."
                            );

                        });


                        return;
                    }


                    // Reset click count

                    clearTimeout(clickTimer);


                    clickTimer =
                        setTimeout(() => {

                            clickCount = 0;

                        }, 600);

                }
            );


            existingOptionsList.appendChild(
                optionElement
            );

        });

    }
    catch (error) {

        console.error(
            "Error loading examination options:",
            error
        );


        existingOptionsList.innerHTML =
            "<p>Unable to load options.</p>";

    }

}


// ================ Delete Option from IndexedDB ================

async function deleteOption(baseName, className) {

    if (!baseName || !className) {
        throw new Error("Option name and class name are required.");
    }

    const db = await openDatabase();

    await new Promise((resolve, reject) => {

        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        store.delete([className, baseName]);

        tx.oncomplete = resolve;

        tx.onerror = () => {
            reject(
                tx.error ||
                new Error("Failed to delete option.")
            );
        };

        tx.onabort = () => {
            reject(
                tx.error ||
                new Error("Delete transaction aborted.")
            );
        };

    });

    await backupMedicalOptionsDB();

    console.log("Option deleted:", {
        className,
        baseName
    });
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



// ================ Load Custom Examination Options Into Popup ================

async function loadCustomExaminationOptions(section) {

    try {

        const className =
            examSectionMap[section];

        const popupId =
            examPopupMap[section];


        // VALIDATE SECTION

        if (!className || !popupId) {

            console.warn(
                "Invalid examination section:",
                section
            );

            return;
        }


        // FIND POPUP

        const popup =
            document.getElementById(popupId);


        if (!popup) {

            console.warn(
                "Popup not found:",
                popupId
            );

            return;
        }


        // FIND TABLE

        const table =
            popup.querySelector("table");


        if (!table) {

            console.warn(
                "Table not found:",
                popupId
            );

            return;
        }


        // GET OPTIONS FROM INDEXEDDB

        const allOptions =
            await getAllOptions();


        // GET CUSTOM OPTIONS FOR THIS SECTION

        const customOptions =
            allOptions.filter(option =>
                option.className === className
            );


        console.log(
            `Custom options for ${section}:`,
            customOptions
        );


        // REMOVE PREVIOUS CUSTOM OPTIONS

        table
            .querySelectorAll(
                ".custom-examination-options-row"
            )
            .forEach(row => row.remove());


        // NO CUSTOM OPTIONS

        if (customOptions.length === 0) {

            return;
        }


        // CREATE FIRST CUSTOM ROW

        let row =
            document.createElement("tr");

        row.className =
            "custom-examination-options-row";


        // ADD CUSTOM OPTIONS

        customOptions.forEach((option, index) => {

            const td =
                document.createElement("td");


            td.className =
                "custom-examination-option";


            td.setAttribute(
                "data-value",
                option.baseName
            );


            td.textContent =
                option.baseName;


            // Add option to current row

            row.appendChild(td);


            // Three options per row

            if (
                (index + 1) % 3 === 0 &&
                index !== customOptions.length - 1
            ) {

                table.appendChild(row);


                row =
                    document.createElement("tr");

                row.className =
                    "custom-examination-options-row";

            }

        });


        // ADD LAST ROW

        if (row.children.length > 0) {

            table.appendChild(row);

        }


        console.log(
            `Added ${customOptions.length} custom option(s) to ${popupId}.`
        );


    } catch (error) {

        console.error(
            "Error loading custom examination options:",
            error
        );

    }

}