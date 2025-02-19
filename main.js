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

    ipcMain.on('print-page', async (event, patientId, date, docName) => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            try {
                // Define base directory (VisionProo on Desktop)
                const baseDir = path.join(app.getPath('desktop'), 'VisionProo');
    
                // Create the base folder if it doesn't exist
                if (!fs.existsSync(baseDir)) {
                    fs.mkdirSync(baseDir);
                }
    
                // Create Patient ID folder
                const patientDir = path.join(baseDir, patientId);
                if (!fs.existsSync(patientDir)) {
                    fs.mkdirSync(patientDir);
                }
    
                // Create Date folder inside Patient ID folder
                const dateDir = path.join(patientDir, date);
                if (!fs.existsSync(dateDir)) {
                    fs.mkdirSync(dateDir);
                }
    
                // Define the PDF filename (Doctor Name included)
                const pdfFilename = `${docName}.pdf`;
                const pdfPath = path.join(dateDir, pdfFilename);
    
                // Generate PDF
                const data = await focusedWindow.webContents.printToPDF({});
                fs.writeFileSync(pdfPath, data);
    
                // Open the generated PDF in the default system viewer
                shell.openPath(pdfPath);
    
                // dialog.showMessageBox({
                //     type: 'info',
                //     message: `PDF saved successfully at: ${pdfPath}`,
                //     buttons: ['OK']
                // });
    
            } catch (error) {
                console.error('Print failed:', error);
                dialog.showErrorBox('Print Error', `Failed to print: ${error.message}`);
            }
        }
    });

        //  Get Patient PDF Records
    ipcMain.handle('get-patient-pdf-records', async (_, patientId) => {
        const visionProoPath = join(app.getPath('desktop'), 'VisionProo', patientId);

        if (!fs.existsSync(visionProoPath)) {
            return []; // No records found
        }

        const records = fs.readdirSync(visionProoPath)
            .filter(file => fs.lstatSync(join(visionProoPath, file)).isDirectory()) // Only get folders (dates)
            .map(dateFolder => ({
                date: dateFolder,
                pdfs: fs.readdirSync(join(visionProoPath, dateFolder))
                    .filter(file => file.endsWith('.pdf')) // Only get PDF files
                    .map(file => ({ name: file, path: join(visionProoPath, dateFolder, file) }))
            }));

        return records;
    });
        
    ipcMain.on('open-pdf', (_, pdfPath) => {
        shell.openPath(pdfPath);
    });

    ipcMain.handle("delete-pdf", async (event, pdfPath) => {
        try {
            await fs.promises.unlink(pdfPath); // Ensure this returns a promise
            return { success: true };
        } catch (error) {
            console.error("Error deleting PDF:", error);
            throw error;
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
