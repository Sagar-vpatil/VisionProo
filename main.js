import { app, BrowserWindow, ipcMain, dialog } from 'electron';  // Use ES Module import
import { fileURLToPath } from 'url';  // Import for file URL conversion
import { dirname, join } from 'path';  // Import path for manipulating paths
import { shell } from 'electron'; // Add this to use shell to open files
import fs from 'fs'; // For file operations
import path from 'path'; // For managing file paths


// Get the directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        webPreferences: {
            preload: join(__dirname, 'backend', 'preload.js'), // Use preload script for better security
            nodeIntegration: false, // Disabling Node.js integration
            contextIsolation: true, // Secure communication between renderer and main process
            // enableRemoteModule: false, // Disable remote module for security
            sandbox: true
        },
        icon: join(__dirname, 'assets', 'logo', 'app-icon.png'), // App icon
    });

    mainWindow.loadFile(join(__dirname, 'frontend', 'index.html')); // Use organized structure

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
    // Handle IPC communication (Example)
    // Show Error dialog box
    ipcMain.handle('show-error-box', (event, title, content) => {
        dialog.showErrorBox(title, content);
    });

    // Show Success dialog box
    ipcMain.handle('show-success-box', (event, title, content) => {
    dialog.showMessageBox({
        type: 'info',
        title: title,
        message: content
    });
});
    // Show Info dialog box
    ipcMain.handle("showMessageBox", async (_, type, message, title, buttons) => {
        const result = await dialog.showMessageBox({
            type: type, // e.g., "info", "warning", "error"
            message: message,
            title: title,
            buttons: buttons, // e.g., ["Yes", "No"]
        });
        return result.response; // Index of the button clicked
    });

    ipcMain.on('print-page', async(event) => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        try {
            const pdfPath = path.join(app.getPath('desktop'), 'output.pdf');
            const data = await focusedWindow.webContents.printToPDF({});
            fs.writeFileSync(pdfPath, data);
            shell.openPath(pdfPath); // Open in the default PDF viewer
        } catch (error) {
            console.error('Print failed:', error);
            dialog.showErrorBox('Print Error', `Failed to print: ${error.message}`);
        }
    }
    });
    
    
}

// Handle IPC communication (Example)
ipcMain.on('navigate-back', () => {
    if(mainWindow){
      mainWindow.loadFile(join(__dirname, 'frontend', 'index.html'));
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
