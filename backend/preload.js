const { contextBridge, ipcRenderer } = require('electron');

console.log("preload is running");

contextBridge.exposeInMainWorld('electronAPI', {
    navigateBack: () => ipcRenderer.send('navigate-back'),
    showErrorBox: (title, content) => ipcRenderer.invoke('show-error-box', title, content),
    showSuccessBox: (title, content) => ipcRenderer.invoke('show-success-box', title, content),
    showMessageBox: (type, message, title, buttons) =>
        ipcRenderer.invoke("showMessageBox", type, message, title, buttons),
    printPage: (patientId, date, docName) => ipcRenderer.send('print-page', patientId, date, docName),
    getPatientPdfRecords: (patientId) => ipcRenderer.invoke('get-patient-pdf-records', patientId),
    openPdf: (pdfPath) => ipcRenderer.send('open-pdf', pdfPath),
    deletePdf: (pdfPath) => ipcRenderer.invoke("delete-pdf", pdfPath),
    saveImage: (patientId, date, docName, imageData) => ipcRenderer.invoke('save-image', patientId, date, docName, imageData),
    checkImageExists: (patientId, date, docName) => ipcRenderer.invoke('check-image-exists', patientId, date, docName),
    openImage: (imagePath) => ipcRenderer.send('open-image', imagePath),
    deleteImage: (imagePath) => ipcRenderer.invoke("delete-image", imagePath),
    checkInternet: () => navigator.onLine,
});

// Inject the popup dynamically
window.addEventListener("DOMContentLoaded", () => {
    const popupHTML = `
        <div id="internet-popup">
            <div class="popup-content">
                <span class="wifi-icon">🌐  <!-- <i class="fa-solid fa-wifi"></i> --></span>
                <h2>No Internet Connection</h2>
                <p>Please check your internet connection and try again.</p>
            </div>
        </div>
    `;

    const popupStyle = `
        <style>
            #internet-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                display: none;
            }
            .popup-content {
                background: #ff4d4d;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0px 0px 15px rgba(255, 0, 0, 0.7);
                animation: fadeIn 0.5s ease-in-out;
            }
            
            .popup-content h2 {
                color: white;
            }
            .popup-content p {
                margin: 10px 0 0;
                font-size: 18px;
                color: black;
            }

            .wifi-icon {
                font-size: 50px;
                display: block;
                margin-bottom: 10px;
                animation: pulse 1.5s infinite alternate;
            }
            body.no-internet {
                pointer-events: none;
                user-select: none;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes pulse {
                from { transform: scale(1); }
                to { transform: scale(1.2); }
            }
        </style>
    `;

    // Append the popup HTML and styles
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    document.head.insertAdjacentHTML("beforeend", popupStyle);

    const internetPopup = document.getElementById("internet-popup");

    function updateInternetStatus() {
        if (!navigator.onLine) {
            internetPopup.style.display = "flex";  // Show popup
            document.body.classList.add("no-internet"); // Disable interactions
        } else {
            internetPopup.style.display = "none";  // Hide popup
            document.body.classList.remove("no-internet"); // Enable interactions
        }
    }

    // Listen for online/offline events
    window.addEventListener("online", updateInternetStatus);
    window.addEventListener("offline", updateInternetStatus);

    // Initial check
    updateInternetStatus();
});