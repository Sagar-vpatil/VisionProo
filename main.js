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

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        mainWindow.maximize();
      });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    
    // Handle IPC communication (Example)
    // Show Error dialog box
    ipcMain.handle('show-error-box', async (event, title, content) => {
        const win = BrowserWindow.getFocusedWindow(); // Get the active window
    
        if (!win) {
            console.error("No active window found for modal dialog.");
            return; // Prevent errors if no window is focused
        }
    
        await dialog.showMessageBox(win, { // Attach to the window to make it modal
            type: 'error',
            title: title,
            message: content,
            modal: true // Ensures the dialog is modal
        });
    });
    // Show Success dialog box    

    ipcMain.handle('show-success-box', async (event, title, content) => {
        const win = BrowserWindow.getFocusedWindow(); // Get the active window
    
        if (!win) {
            console.error("No active window found for modal dialog.");
            return; // Prevent issues if no window is focused
        }
    
        await dialog.showMessageBox(win, { // Attach the dialog to the window
            type: 'info',
            title: title,
            message: content,
            modal: true // Ensures the dialog is modal
        });
    });
    ipcMain.handle("showMessageBox", async (event, type, message, title, buttons) => {
        const win = BrowserWindow.getFocusedWindow(); // Get the active window

        if (!win) {
            console.error("No active window found for modal dialog.");
            return -1; // Prevent errors if no window is focused
        }

        const result = await dialog.showMessageBox(win, { // Attach to the main window
            type: type,
            message: message,
            title: title,
            buttons: buttons,
            modal: true // Ensures it blocks interactions with the rest of the app
        });

        return result.response;
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

     // Handler for saving images
     ipcMain.handle('save-image', async (event, patientId, date, docName, imageData) => {
        try {
            const baseDir = path.join(app.getPath('desktop'), 'VisionProo');
            if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
    
            const patientDir = path.join(baseDir, patientId);
            if (!fs.existsSync(patientDir)) fs.mkdirSync(patientDir);
    
            const dateDir = path.join(patientDir, date);
            if (!fs.existsSync(dateDir)) fs.mkdirSync(dateDir);
    
            const imageFilename = `${docName}.png`;
            const imagePath = path.join(dateDir, imageFilename);
    
            const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(imagePath, buffer);
    
            console.log('Image saved successfully at:', imagePath);
            return { success: true, path: imagePath };
        } catch (error) {
            console.error('Save image failed:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle("check-image-exists", async (event, patientId, date, docName) => {
        try {
            const baseDir = path.join(app.getPath("desktop"), "VisionProo");
            const imagePath = path.join(baseDir, patientId, date, `${docName}.png`);
    
            if (fs.existsSync(imagePath)) {
                return { exists: true, path: `${imagePath}` };
            } else {
                return { exists: false };
            }
        } catch (error) {
            console.error("Error checking image:", error);
            return { exists: false };
        }
    });

    // Open image in default image viewer
    ipcMain.on("open-image", (event, imagePath) => {
        if (fs.existsSync(imagePath)) {
            shell.openPath(imagePath);
        } else {
            console.error("Image not found:", imagePath);
        }
    });
    
    // Delete image
    ipcMain.handle("delete-image", async (event, imagePath) => {
        try {
            await fs.promises.unlink(imagePath); // Delete the file
            console.log("Image deleted:", imagePath);
            return { success: true };
        } catch (error) {
            console.error("Error deleting image:", error);
            return { success: false, error: error.message };
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
