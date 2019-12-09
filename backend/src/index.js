//Step 4: Spin up a version of the Yoga server
//start up the node server
const cookieParser = require('cookie-parser');
//make sure variables in variables.env are available
require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

//store the function in another file, run it and store it in a const 
const server = createServer();

//use express middleware to handle cookies (JWT = Javascript web token)
server.express.use(cookieParser());

//use express middleware to populate current user

//only want this website to hit endpoint
server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL
	}
}, returnedInfo => {
	console.log(`Server is now running on port http:/localhost:${returnedInfo.port}`);
});