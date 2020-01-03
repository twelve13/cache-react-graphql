//Step 4: Spin up a version of the Yoga server
//start up the node server
const cookieParser = require('cookie-parser');
//make sure variables in variables.env are available
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

//store the function in another file, run it and store it in a const 
const server = createServer();

//use express middleware to handle cookies (JWT = Javascript web token)
server.express.use(cookieParser());

//use express middleware to populate current user

//decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if(token) {
		const {userId} = jwt.verify(token, process.env.APP_SECRET);
		//put the userId onto the req for future requests to access
		req.userId = userId;
	}
	next();
});

//only want this website to hit endpoint
server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL
	}
}, returnedInfo => {
	console.log(`Server is now running on port http:/localhost:${returnedInfo.port}`);
});