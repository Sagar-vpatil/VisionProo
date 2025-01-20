const { contextBridge, ipcRenderer } = require('electron');

console.log("preload is running");

contextBridge.exposeInMainWorld('electronAPI', {
    navigateBack: () => ipcRenderer.send('navigate-back'),
    showErrorBox: (title, content) => ipcRenderer.invoke('show-error-box', title, content),
    showSuccessBox: (title, content) => ipcRenderer.invoke('show-success-box', title, content),
    showMessageBox: (type, message, title, buttons) =>
        ipcRenderer.invoke("showMessageBox", type, message, title, buttons),
});
