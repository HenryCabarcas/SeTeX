const { contextBridge, ipcRenderer, remote } = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const validInputChannels = [
    "window-handle",
    "path"
]

const validOutputChannels = [
    "window-handle",
    "path",
    "set-window-name",
    "get-window-name",
    "send-message-to-one-drive",
    "update-badge",
    "is-hidden",
    "open-google-sign-in"
]

const api = {
    send: (channel, data) => {
        if (validInputChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    sendSync: (channel, data) => {
        if (validInputChannels.includes(channel)) {
            ipcRenderer.sendSync(channel, data);
        }
    },
    receive: (channel, func) => {
        if (validOutputChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
}

contextBridge.exposeInMainWorld("api", api);