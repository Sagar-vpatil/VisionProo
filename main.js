const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname,'backend', 'preload.js'), // Use preload script for better security
            contextIsolation: true, // Secure communication between renderer and main process
            enableRemoteModule: false, // Disable remote module for security
            
        },
        icon: path.join(__dirname, 'assets','logo', 'app-icon.png'), // App icon
    });

    mainWindow.loadFile(path.join(__dirname, 'frontend', 'index.html')); // Use organized structure

   

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}



// Handle IPC communication (Example)
ipcMain.on('navigate-back', () => {
    if(mainWindow){
      mainWindow.loadFile(path.join(__dirname,'frontend','index.html'));
    }
  });
  

// App ready event
app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});




