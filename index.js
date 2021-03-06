
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { app, BrowserWindow } = require('electron');

const theme = require('./utils/theme');

app.on('ready', () => {
	const win = new BrowserWindow({
		backgroundColor: theme.colors.themeBaseColor,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	win.setAutoHideMenuBar(true);
	win.setMenuBarVisibility(false);
	win.loadFile('index.html');

	win.on('closed', () => {
		app.quit();
	});

	if (process.env.NODE_ENV !== 'production') {
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require('electron-devtools-installer');

		installExtension(REACT_DEVELOPER_TOOLS)
			.then(name => console.log(`Added Extension:	 ${name}`))
			.catch(error => console.error(error));

		installExtension(REDUX_DEVTOOLS)
			.then(name => console.log(`Added Extension:	 ${name}`))
			.catch(error => console.error(error));
	}
});
