/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");
const { app, BrowserWindow } = require("electron");

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    transparent: true,
  });

  if (process.env.URL) {
    win.loadURL(process.env.URL);
  } else {
    win.loadFile(path.join(__dirname, "dist/index.html"));
  }
}

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(createWindow);
