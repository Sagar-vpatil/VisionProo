


const tabs = document.querySelectorAll('.ttab'); // Updated class name to 'ttab'
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove 'active' class from all tabs and sections
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    // Add 'active' class to the clicked tab and corresponding section
    tab.classList.add('active');
    const sectionId = tab.getAttribute('data-section');
    document.getElementById(sectionId).classList.add('active');
  });
});

// Activate the first tab and section by default
tabs[0].classList.add('active');
sections[0].classList.add('active');




// First block: Options for SPH, CYL, etc.
const inputs = document.querySelectorAll(
    "#DV-SPH, #DV-CYL, #NV-SPH, #NV-CYL, #NV-SPH2, #NV-CYL2, #DV-CYL2, #DV-SPH2"
  );
  const optionsTable = document.getElementById("optionsTable");
  let currentInput = null;

  // Event listener to show options
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      currentInput = e.target; // Save reference to the clicked input box
      const rect = currentInput.getBoundingClientRect();
      optionsTable.style.top = `${rect.bottom + window.scrollY}px`;
      optionsTable.style.left = `${rect.left + window.scrollX}px`;
      optionsTable.style.display = "block";
      // rightAddCal();
    });
  });

  // Event listener for option selection
  optionsTable.addEventListener("click", (e) => {
    if (e.target.tagName === "TD" && currentInput) {
      currentInput.value = e.target.innerText; // Set value to the clicked option
      optionsTable.style.display = "none";
    }
  });

//   ########################### Options Table code start  ####################################

  
      // Close table when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !optionsTable.contains(e.target) &&
          !Array.from(inputs).includes(e.target)
        ) {
          optionsTable.style.display = "none";
        }
      });

      // Second block: Axis Options
      const axisInputs = document.querySelectorAll(
        "#NV-Axis, #NV-Axis2, #DV-Axis, #DV-Axis2"
      );
      const axisOptionsTable = document.getElementById("axisOptionsTable");
      let currentAxisInput = null;

      // Show options table on input click
      axisInputs.forEach((input) => {
        input.addEventListener("click", (e) => {
          currentAxisInput = e.target; // Save reference to the clicked input
          const rect = currentAxisInput.getBoundingClientRect();
          axisOptionsTable.style.top = `${rect.bottom + window.scrollY}px`;
          axisOptionsTable.style.left = `${rect.left + window.scrollX}px`;
          axisOptionsTable.style.display = "block";
        });
      });

      // Set value when option is clicked
      axisOptionsTable.addEventListener("click", (e) => {
        if (e.target.tagName === "TD" && currentAxisInput) {
          currentAxisInput.value = e.target.innerText;
          axisOptionsTable.style.display = "none";
        }
      });

      // Close options table on outside click
      document.addEventListener("click", (e) => {
        if (
          !axisOptionsTable.contains(e.target) &&
          !Array.from(axisInputs).includes(e.target)
        ) {
          axisOptionsTable.style.display = "none";
        }
      });

      // Third block: VA Options
      const vaInputs = document.querySelectorAll("#DV-VA, #DV-VA2"); // Corrected input field IDs
      const VAoptionsTable = document.getElementById("NV-VATable"); // Table to show options

      let activeVaInputField = null;

      // Show options table on input click
      vaInputs.forEach((input) => {
        input.addEventListener("click", (e) => {
          activeVaInputField = e.target; // Save reference to the clicked input
          const rect = activeVaInputField.getBoundingClientRect();
          VAoptionsTable.style.top = `${rect.bottom + window.scrollY}px`; // Position below the input
          VAoptionsTable.style.left = `${rect.left + window.scrollX}px`; // Position aligned with the input
          VAoptionsTable.style.display = "block"; // Show the options table
        });
      });

      // Set value when option is clicked
      VAoptionsTable.addEventListener("click", (e) => {
        if (e.target.tagName === "TD" && activeVaInputField) {
          activeVaInputField.value = e.target.innerText; // Set the value to the clicked option
          VAoptionsTable.style.display = "none"; // Hide the options table after selection
        }
      });

      // Close options table on outside click
      document.addEventListener("click", (e) => {
        if (
          !VAoptionsTable.contains(e.target) && // Clicked outside the table
          !Array.from(vaInputs).includes(e.target) // Clicked outside the input fields
        ) {
          VAoptionsTable.style.display = "none"; // Hide the options table
        }
      });

      // Fourth block: NVD Options (with correct IDs and positions)
      const nvdInputs = document.querySelectorAll("#NV-VA, #NV-VA2"); // Corrected input field IDs
      const NVDoptionsTable = document.getElementById("NVDVATable"); // Corrected table ID
      let activeNvdInputField = null;

      // Function to position the options table
      function positionTable(input) {
        const rect = input.getBoundingClientRect();
        const tableHeight = NVDoptionsTable.offsetHeight; // Use NVDoptionsTable here
        const tableWidth = NVDoptionsTable.offsetWidth; // Not used but added for completeness

        // Position the table below the input field
        const bottomPosition =
          rect.bottom + tableHeight <= window.innerHeight
            ? rect.bottom
            : rect.top - tableHeight;
        const leftPosition = rect.left + window.scrollX;

        // Set position for the options table
        NVDoptionsTable.style.top = `${bottomPosition + window.scrollY}px`; // Use NVDoptionsTable
        NVDoptionsTable.style.left = `${leftPosition}px`; // Use NVDoptionsTable
      }

      // Show the options table when input field is clicked
      nvdInputs.forEach((input) => {
        input.addEventListener("click", (e) => {
          activeNvdInputField = e.target; // Store reference to clicked input
          positionTable(activeNvdInputField); // Position the table near the input
          NVDoptionsTable.style.display = "block"; // Show the options table
        });
      });

      // Select value from the options table
      NVDoptionsTable.addEventListener("click", (e) => {
        if (e.target.tagName === "TD" && activeNvdInputField) {
          activeNvdInputField.value = e.target.innerText; // Set input value
          NVDoptionsTable.style.display = "none"; // Hide the options table after selection
        }
        e.stopPropagation(); // Prevent event from propagating to document
      });

      // Close the options table when clicked outside
      document.addEventListener("click", (e) => {
        if (
          !NVDoptionsTable.contains(e.target) && // Clicked outside the table
          !Array.from(nvdInputs).includes(e.target) // Clicked outside the input fields
        ) {
          NVDoptionsTable.style.display = "none"; // Hide the options table
        }
      });










      let activeInputField = null;
      let currentOptionsTable = null;
    
      // Function to show the correct options table based on the input field's focus
      function showOptions(event, tableId) {
        const optionsTable = document.getElementById(tableId); // Use the passed tableId to get the correct table
        activeInputField = event.target;
        currentOptionsTable = optionsTable;
    
        const rect = activeInputField.getBoundingClientRect();
        optionsTable.style.top = `${rect.bottom + window.scrollY}px`;
        optionsTable.style.left = `${rect.left + window.scrollX}px`;
        optionsTable.style.display = 'block';
    
        // Hide the options table if clicked outside
        document.addEventListener('click', (e) => {
          if (
            !optionsTable.contains(e.target) && // Clicked outside the options table
            e.target !== activeInputField // Clicked outside the active input field
          ) {
            optionsTable.style.display = 'none';
          }
        });
      }
    
      // Function to select an option and update the input field value
      function selectOption(event) {
        if (activeInputField) {
          activeInputField.value = event.target.textContent; // Set the input field's value to the selected option
        }
        currentOptionsTable.style.display = 'none'; // Hide the options table
      }
    
      // Attach event listeners to table cells to make them clickable
      const myOptionsTable = document.getElementById('myOptionsTable');
      const myOptionsTable2 = document.getElementById('myOptionsTable2');
    
      myOptionsTable.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {
          selectOption(e); // Set value on click
        }
      });
    
      myOptionsTable2.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {
          selectOption(e); // Set value on click
        }
      });
      


 // Function to show the correct options table based on the input field's focus
 function showOptions(event, tableId) {
  const optionsTable = document.getElementById(tableId); // Use the passed tableId to get the correct table
  activeInputField = event.target;
  currentOptionsTable = optionsTable;

  const rect = activeInputField.getBoundingClientRect();
  optionsTable.style.top = `${rect.bottom + window.scrollY}px`;
  optionsTable.style.left = `${rect.left + window.scrollX}px`;
  optionsTable.style.display = 'block';

  // Hide the options table if clicked outside
  document.addEventListener('click', (e) => {
    if (
      !optionsTable.contains(e.target) && // Clicked outside the options table
      e.target !== activeInputField // Clicked outside the active input field
    ) {
      optionsTable.style.display = 'none';
    }
  });
}

// Function to select an option and update the input field value
function selectOption(event) {
  if (activeInputField) {
    activeInputField.value = event.target.textContent; // Set the input field's value to the selected option
  }
  currentOptionsTable.style.display = 'none'; // Hide the options table
}

// Attach event listeners to table cells to make them clickable
const nRefraction = document.getElementById('nRefraction');
nRefraction.addEventListener('click', (e) => {
  if (e.target.tagName === 'TD') {
    selectOption(e); // Set value on click
  }
});
  


// Define unique names for the variables to avoid conflict
const refractionOptionsTable = document.getElementById("nRefraction1");
let currentActiveInputField = null;

// Function to position the options table
function positionRefractionTable(input) {
  const rect = input.getBoundingClientRect();
  const tableHeight = refractionOptionsTable.offsetHeight;

  // Position the table below the input field
  const bottomPosition =
    rect.bottom + tableHeight <= window.innerHeight
      ? rect.bottom
      : rect.top - tableHeight;
  const leftPosition = rect.left + window.scrollX;

  // Set position for the options table
  refractionOptionsTable.style.top = `${bottomPosition + window.scrollY}px`;
  refractionOptionsTable.style.left = `${leftPosition}px`;
}

// Show the options table when an input field is clicked
const inputFields = document.querySelectorAll("#rva, #rva2");
inputFields.forEach((input) => {
  input.addEventListener("click", (e) => {
    currentActiveInputField = e.target; // Store reference to clicked input
    positionRefractionTable(currentActiveInputField); // Position the table near the input
    refractionOptionsTable.style.display = "block"; // Show the options table
  });
});

// Select value from the options table and set it in the input field
refractionOptionsTable.addEventListener("click", (e) => {
  if (e.target.tagName === "TD" && currentActiveInputField) {
    currentActiveInputField.value = e.target.innerText; // Set the input value
    refractionOptionsTable.style.display = "none"; // Hide the options table after selection
  }
  e.stopPropagation(); // Prevent event from propagating to document
});

// Close the options table when clicked outside
document.addEventListener("click", (e) => {
  if (
    !refractionOptionsTable.contains(e.target) && // Clicked outside the table
    !Array.from(inputFields).includes(e.target) // Clicked outside the input fields
  ) {
    refractionOptionsTable.style.display = "none"; // Hide the options table
  }
});

let currentInputField_lradiPrjrnty = null; // Track the active input field
const table = document.getElementById(''); // Table element

// Function to show the table for a specific input field
function attachInputFieldListener(inputId) {
  const inputField = document.getElementById(inputId);
  inputField.addEventListener('click', (event) => {
    if (currentInputField_lradiPrjrnty !== event.target) {
      // Hide the table if a different input field is clicked
      table.style.display = 'none';
    }
    currentInputField_lradiPrjrnty = event.target; // Set the active input field
    const rect = inputField.getBoundingClientRect();
    table.style.top = rect.bottom + 'px';
    table.style.left = rect.left + 'px';
    table.style.display = 'block'; // Show the table
  });
}

// Attach listeners to each input field (including the new ones)
// attachInputFieldListener('rSPH');
// attachInputFieldListener('rCYL');
// attachInputFieldListener('lrSPH');
// attachInputFieldListener('lrCYL');
// attachInputFieldListener('rSPH1');
// attachInputFieldListener('rCYL1');
// attachInputFieldListener('lrSPH2');
// attachInputFieldListener('lrCYL2');

// Handle table cell click to set the value in the active input field
table.addEventListener('click', (event) => {
  if (event.target.tagName === 'TD' && event.target.textContent.trim() !== '') {
    if (currentInputField_lradiPrjrnty) {
      currentInputField_lradiPrjrnty.value = event.target.textContent;
    }
    table.style.display = 'none'; // Hide the table after selection
  }
});

// Hide the table when clicking outside
document.addEventListener('click', (event) => {
  if (
    !table.contains(event.target) && // Click is outside the table
    currentInputField_lradiPrjrnty !== event.target // Click is not on the current input field
  ) {
    table.style.display = 'none';
  }
});


// Get references to the input fields and table using querySelector
const modalTable = document.getElementById('nRefraction3');
const inputFieldOne = document.querySelector('#rV\\/A'); // Escape the forward slash
const inputFieldTwo = document.querySelector('#rV\\/A2'); // Escape the forward slash

let currentlyActiveInput = null; // Track the currently active input field

// Function to handle showing the table and inserting values into the respective input field
function displayModalTableAndInsertValue(currentInputField) {
  // Update the currently active input field when it is clicked
  currentlyActiveInput = currentInputField;
  
  // Get the position of the input field
  const fieldPosition = currentInputField.getBoundingClientRect();
  modalTable.style.top = fieldPosition.bottom + 'px';
  modalTable.style.left = fieldPosition.left + 'px';
  modalTable.style.display = 'block'; // Show the table
  
  // Handle table cell selection
  modalTable.addEventListener('click', function handleTableSelection(event) {
    if (event.target.tagName === 'TD' && event.target.textContent.trim() !== '') {
      if (currentlyActiveInput) {
        currentlyActiveInput.value = event.target.textContent; // Insert value into the correct input field
        modalTable.style.display = 'none'; // Hide the table after selection
      }
    }
  });
}

// Show the table when the respective input fields are clicked
inputFieldOne.addEventListener('click', () => displayModalTableAndInsertValue(inputFieldOne));
inputFieldTwo.addEventListener('click', () => displayModalTableAndInsertValue(inputFieldTwo));

// Hide the table when clicking outside of it
document.addEventListener('click', (event) => {
  if (
    !modalTable.contains(event.target) && // Click is outside the table
    event.target !== inputFieldOne && // Click is not on inputFieldOne
    event.target !== inputFieldTwo   // Click is not on inputFieldTwo
  ) {
    modalTable.style.display = 'none'; // Hide the table
  }
});




    //   ########################### Options Table code end  ####################################

// // Function to initialize symptom toggling and dynamic tag updates
// function initializeSymptomSelection() {
//   const buttons = document.querySelectorAll('.eye-symptom-btn'); // All buttons for toggling
//   const symptomContainers = document.querySelectorAll('.symptom-options-container'); // All symptom containers
//   const symptomTags = document.getElementById('symptom-tags'); // Tag container

//   // Add event listeners for all toggle buttons
//   buttons.forEach(button => {
//     button.addEventListener('click', () => {
//       // Remove active class from all buttons
//       buttons.forEach(btn => btn.classList.remove('active'));
//       // Add active class to the clicked button
//       button.classList.add('active');

//       // Hide all symptom containers
//       symptomContainers.forEach(container => (container.style.display = 'none'));

//       // Show the relevant container
//       const targetContainerId = button.getAttribute('data-target');
//       document.getElementById(targetContainerId).style.display = 'flex';

//       // Clear and reset the tags container
//       symptomTags.textContent = `Selected: ${button.textContent}`;
//     });
//   });

//   // Function to handle selection inside the symptom container
//   symptomContainers.forEach(container => {
//     container.addEventListener('click', event => {
//       const option = event.target;
//       if (option.classList.contains('option')) {
//         // Toggle selection state
//         option.classList.toggle('selected');

//         // Update tags dynamically
//         updateTags(symptomTags, container);
//       }
//     });
//   });
// }

// // Helper function to update the tags based on selected options
// function updateTags(tagsContainer, container) {
//   const selectedOptions = container.querySelectorAll('.option.selected');
//   const selectedTexts = Array.from(selectedOptions).map(option => option.textContent);

//   // Update the tags display
//   if (selectedTexts.length > 0) {
//     tagsContainer.textContent = `Selected: ${selectedTexts.join(', ')}`;
//   } else {
//     tagsContainer.textContent = 'Selected: None';
//   }
// }

// // Initialize the functionality
// initializeSymptomSelection();
// Get the buttons and sections


function toggleInvestigation(element) {
  // Toggle the 'selected' class for visual feedback
  element.classList.toggle("selected");

  // Add or remove the selected option from the investigation tags container
 

  if (element.classList.contains("selected")) {
    document.getElementById("investigation-tags").appendChild(tag);
  } else {
    const tags = document.querySelectorAll(".investigation-tag");
    tags.forEach((t) => {
      if (t.textContent === element.textContent) {
        t.remove();
      }
    });
  }
}


















// Function to handle button clicks and show the corresponding diagnosis content
document.getElementById('both-diagnosis-btn').addEventListener('click', function() {
  showDiagnosisContent('both');
  setActiveButton(this);
});

document.getElementById('right-diagnosis-btn').addEventListener('click', function() {
  showDiagnosisContent('right');
  setActiveButton(this);
});

document.getElementById('left-diagnosis-btn').addEventListener('click', function() {
  showDiagnosisContent('left');
  setActiveButton(this);
});

function showDiagnosisContent(eye) {
  // Hide all diagnosis content sections
  document.querySelectorAll('.diagnosis-content').forEach(function(section) {
      section.style.display = 'none';
  });

  // Show the selected diagnosis content section
  document.getElementById(eye + '-diagnosis-content').style.display = 'block';
}

function setActiveButton(activeButton) {
  // Remove active class from all buttons
  document.querySelectorAll('#diagnosis .btn').forEach(function(button) {
      button.classList.remove('active');
      button.style.backgroundColor = 'white';
      button.style.color = 'black';
      button.style.border = '2px solid #6c757d';
  });

  // Add active class to the clicked button
  activeButton.classList.add('active');
  activeButton.style.backgroundColor = 'green';
  activeButton.style.color = 'white';
  activeButton.style.border = '2px solid darkgreen';
}

// Set "Both Eyes" as active by default
document.getElementById('both-diagnosis-btn').click();










    // Function to toggle surgical history selection
    function toggleSurgicalHistory(element) {
      element.classList.toggle('selected');
    }