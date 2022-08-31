import { Crypt } from '../../utils/crypt';
import { Users } from '../domain';
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
	try {
		const findUser = await Users.find(req.body.email);

		if (findUser) {
			return res.status(401).json({
				status: 'Error',
				ErrorMessage: 'This email already exists.'
			});
		}

		const hashPassword = await Crypt.encryptPassword(req.body.password);

		const createdUser = await Users.create({
			...req.body,
			password: hashPassword
		});

		const token = await Crypt.generateJWT(createdUser.id, createdUser.username);

		res.status(201).json({
			uid: createdUser.id,
			username: createdUser.username,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: 'Error',
			ErrorMessage: 'Something went wrong please check the logs.'
		});
	}
};

const login = async (req: Request, res: Response) => {
	try {
		const findUser = await Users.find(req.body.email);
		if (!findUser) {
			return res.status(401).json({
				status: 'Error',
				ErrorMessage: 'Email or password is incorrect'
			});
		}

		const isPassword = await Crypt.comparePassword(
			req.body.password,
			findUser.password
		);

		if (!isPassword) {
			return res.status(401).json({
				status: 'Error',
				ErrorMessage: 'Email or password is incorrect'
			});
		}

		const token = await Crypt.generateJWT(findUser.id, findUser.username);

		res.status(200).json({
			uid: findUser.id,
			username: findUser.username,
			token
		});
	} catch (error) {
		console.log(error),
			res.status(400).json({
				status: 'Error',
				ErrorMessage: 'Something went wrong please check the logs.'
			});
	}
};

const renew = async (req: Request, res: Response) => {
	const { uid, username } = req.body;
	try {
		const token = await Crypt.generateJWT(uid, username);
		return res.status(200).json({
			status: 'Completed',
			token
		});
	} catch (err) {
		console.log(err);
		return res.status(404).json({
			status: 'Error',
			ErrorMessage: 'Please contact an admin'
		});
	}
};
export const UserController = {
	register,
	login,
	renew
};
