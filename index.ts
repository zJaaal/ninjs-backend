import express from 'express';
import { connectMongoDB } from './src/database';
import user from './src/user/controller/route';
const cors = require('cors');

//Initialize .env
require('dotenv').config();

//Initialize express
const app = express();

//Initialize json parser
app.use(express.json());

app.use(cors());

//Connect to Mongo
connectMongoDB();

//Initialize app endpoints
app.use('/api/user', user); //User

//Start to listen to server port
app.listen(process.env.PORT, () => {
	console.log(`Server is listening on ${process.env.PORT}`);
});
