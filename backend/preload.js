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
});
