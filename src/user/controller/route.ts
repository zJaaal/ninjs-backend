import express from 'express';
import { UserController } from '.';
import { validate } from '../../middleware/validation';
import {
	userRegisterSchema,
	userLoginSchema,
	updateProfileSchema
} from '../validations/schemas/schemas';

const user = express.Router();
//This is the intialization of register endpoint, it validates its schema on a middleware
user.post('/', validate.schema(userRegisterSchema), UserController.register);

//This is the intialization of login endpoint, it validates its schema on a middleware
user.post('/login', validate.schema(userLoginSchema), UserController.login);

//This is the initialization of renew endpoint, it validates the JWT on a middleware
user.get('/renew', validate.jwt, UserController.renew);

//This is the initialization of validate endpoint, it validates the JWT on a middleware
user.get('/validate', validate.jwt, UserController.validate);

//This is the initialization of update profile endpoint
user.put(
	'/profile',
	validate.jwt,
	validate.schema(updateProfileSchema),
	UserController.updateProfile
);
//This is the initialization of get progress endpoint
user.get('/progress', validate.jwt, UserController.progress);

export default user;
