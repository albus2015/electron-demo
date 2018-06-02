const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 1366, height: 768 })

	// and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
	
	//mainWindow.webContents.on('did-get-response-details', (event, item, originalURL) => {
    //    console.log("--- " + originalURL);
    //});
	
	mainWindow.webContents.session.webRequest.onSendHeaders((details, callback) => {
        console.log("+++ " + details.url);
    })
	
	// 当页面加载完成时，会触发`did-finish-load`事件。
    mainWindow.webContents.on('did-finish-load', () => {
		//mainWindow.close();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.commandLine.appendSwitch("--disable-http-cache");
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	app.quit()
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.