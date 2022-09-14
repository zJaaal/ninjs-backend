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
			variant: 'marble',
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
			variant: findUser.variant,
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

const updateProfile = async (req: Request, res: Response) => {
	try {
		const updatedUser = await Users.updateProfile(req.body);
		if (!updatedUser) {
			return res.status(404).json({
				status: 'Error',
				ErroMessage: "Couldn't find any user"
			});
		}
		return res.status(200).json({
			status: 'Completed',
			result: {
				username: updatedUser.username,
				variant: updatedUser.variant
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: 'Error',
			ErrorMessage: 'Please contact an admin'
		});
	}
};

const progress = async (req: Request, res: Response) => {
	try {
		const userProgress = await Users.getProgress(req.query.uid as string);
		if (!userProgress) {
			return res.status(400).json({
				status: 'Error',
				ErrorMessage: "Couldn't find an user"
			});
		}
		if (!userProgress!.progress?.length) {
			return res.status(404).json({
				status: 'Error',
				ErrorMessage: "Couldn't find any progress"
			});
		}
		res.status(200).json({
			status: 'Completed',
			result: userProgress!.progress
		});
	} catch (error) {
		console.log(error),
			res.status(400).json({
				status: 'Error',
				ErrorMessage: 'Something went wrong please contact an admin.'
			});
	}
};
const renew = async (req: Request, res: Response) => {
	const { uid, username } = req.query;
	try {
		const token = await Crypt.generateJWT(uid as string, username as string);
		return res.status(200).json({
			status: 'Completed',
			token
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: 'Error',
			ErrorMessage: 'Please contact an admin'
		});
	}
};

const validate = async (req: Request, res: Response) => {
	try {
		const token = req.headers['x-token'];
		return res.status(200).json({
			status: 'Completed',
			token
		});
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			status: 'Error',
			ErrorMessage: 'Please contact an admin'
		});
	}
};

export const UserController = {
	register,
	login,
	renew,
	validate,
	updateProfile,
	progress
};
