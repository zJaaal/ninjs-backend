import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import yup from 'yup';
import * as JWT from 'jsonwebtoken';
/**
 * @description This HOF takes a Yup schema and returns a middleware that makes a validation
 * @param schema
 * @returns Middleware
 */
const schema =
	(schema: yup.AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			//Here validates and set the validated object

			req.body = await schema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true
			});

			//Calls the next middleware
			next();
		} catch (error) {
			res.status(400).json({
				status: 'Validation Error',
				error
			});
		}
	};

const jwt = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['x-token'];

	if (!token) {
		return res.status(400).json({
			status: 'Error',
			ErrorMessage: 'Please send a token in the request'
		});
	}

	try {
		const { uid, username } = JWT.verify(
			token as string,
			process.env.SECRET_KEY as string
		) as JwtPayload;
		req.body.uid = uid;
		req.body.username = username;
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			status: 'Error',
			ErrorMessage: 'Please send a valid token in the request'
		});
	}

	next();
};

export const validate = {
	schema,
	jwt
};
