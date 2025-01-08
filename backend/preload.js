const { contextBridge, ipcRenderer } = require('electron');

console.log("preload is running");

contextBridge.exposeInMainWorld('electronAPI', {
    navigateBack: () => ipcRenderer.send('navigate-back'),
});
