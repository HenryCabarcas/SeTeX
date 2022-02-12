const { app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')
const ipc = require("electron").ipcMain
const isDev = process.env.NODE_ENV === "development"
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
});
let win;
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 640, // set a min width!
        minHeight: 420,
        center: true,
        frame: false,
        titleBarStyle: "hidden",
        transparent: true,
        roundedCorners: true,
        webPreferences: {
            //devTools: isDev,
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            // nodeIntegrationInSubFrames: false,
            contextIsolation: true,
            //enableRemoteModule: true,
            additionalArguments: [`storePath:${app.getPath("userData")}`],
            allowRunningInsecureContent: false,
            worldSafeExecuteJavaScript: true,
            webSecurity: true,
            preload: path.join(app.getAppPath(), "preload.js"),
            experimentalFeatures: true
        }
    })

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    win.loadURL(startUrl)


    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.webContents.on("did-finish-load", () => {

        win.webContents.openDevTools();
    })
    // Open the DevTools.

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
        if (parsedUrl.origin !== "https://api.nerdtronik.com") {
            event.preventDefault()
        }
    })
})

ipc.on("window-handle", (e, message) => {
    if (message === "minimize") {
        win.minimize();
    }
    else if (message === "restore") {
        if (win.isMaximized()) {
            win.restore();
            win.unmaximize();

        }
        else {
            win.maximize();
        }
    } else if (message === "close") {
        win.close();
    }
})

ipc.on("path", (e, message) => {
    e.reply("path", path.join(__dirname, message));
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
