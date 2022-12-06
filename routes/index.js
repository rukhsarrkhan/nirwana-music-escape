const routesAPI = require('./routesAPI');
const playListRoutes = require('./playlistroute');

const constructorMethod = (app) => {
	app.use('/', routesAPI);
	app.use('/playlists', playListRoutes)

	app.use('*', (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;