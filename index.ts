import express from 'express';
import { connectMongoDB } from './src/database';
import { validate } from './src/middleware/validation';
import questions from './src/question/controller/router';
import user from './src/user/controller/route';
const cors = require('cors');

//Initialize .env
require('dotenv').config();

//Initialize express
const app = express();

//Initialize json parser
app.use(express.json());

// app.use(
// 	cors({
// 		origin: process.env.CORS_ORIGIN
// 	})
// );

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader(
		'Access-Control-Allow-Origin',
		process.env.CORS_ORIGIN as string
	);

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', '*');

	// Pass to next layer of middleware
	next();
});

//Connect to Mongo
connectMongoDB();

//Initialize app endpoints
app.use('/api/user', user); //User
app.use('/api/quiz', validate.jwt, questions); //Quiz

//Start to listen to server port
app.listen(process.env.PORT, () => {
	console.log(`Server is listening on ${process.env.PORT}`);
});
