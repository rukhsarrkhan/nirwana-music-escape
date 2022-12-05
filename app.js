// Setup server, session and middleware here.
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const session = require('express-session');
const exphbs = require('express-handlebars');
const {protect} = require('./middleware/authJwt')
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		name: 'AuthCookie',
		saveUninitialized: true,
		secret: "some secret string!",
		resave: false,
		cookie: { maxAge: 600000 },
	})
);

app.use(async (req, res, next) => {
	if (req.session.user) {
		console.log(
			`${new Date().toUTCString()} ${req.method} ${
				req.originalUrl
			} (Authenticated User)`
		);
	} else {
		console.log(
			`${new Date().toUTCString()} ${req.method} ${
				req.originalUrl
			} (Non-Authenticated User)`
		);
	}
	next();
});

// app.use('/protected', protect,(req, res,  next) => {
// 	// if (!req.session.user) {
// 	// 	return res.status(401).send("Unauthhereorized")
// 	// } else {
// 	// 	next();
// 	// }
// 	next();
// });

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
