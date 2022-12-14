// Setup server, session and middleware here.
const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const session = require('express-session');
const exphbs = require('express-handlebars');
const {protect} = require('./middleware/authJwt')
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors())



configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
