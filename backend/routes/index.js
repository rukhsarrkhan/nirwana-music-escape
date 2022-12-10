const routesAPI = require('./routesAPI');
const playListRoutes = require('./playlistRoute');
const songsRoutes = require('./songsRoute');

const constructorMethod = (app) => {
	app.use('/', routesAPI);
	app.use('/playlists', playListRoutes)
	app.use('/songs', songsRoutes)

	app.use('*', (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;