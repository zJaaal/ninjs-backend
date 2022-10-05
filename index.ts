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

//added cors
app.use(cors());

//Initialize json parser
app.use(express.json());

//Connect to Mongo
connectMongoDB();

//Initialize app endpoints
app.use('/api/user', user); //User
app.use('/api/quiz', validate.jwt, questions); //Quiz

//Start to listen to server port
app.listen(process.env.PORT, () => {
	console.log(`Server is listening on ${process.env.PORT}`);
});
