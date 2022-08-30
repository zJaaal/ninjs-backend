import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
/**
 * @description This function takes a passwords and generate and encryption of it
 * @param password
 * @returns The encrypted password
 */
const encryptPassword = async (password: string) => {
	const salt = await bcrypt.genSalt();
	return await bcrypt.hash(password, salt);
};

/**
 * @description This function takes the passwords provided by the user and the password in the database
 * 							and compare if they are the same
 * @param password
 * @param toCompare
 * @returns boolean that represents the equality
 */
const comparePassword = async (password: string, toCompare: string) => {
	return await bcrypt.compare(password, toCompare);
};

/**
 * @description This function takes the uid and username provided by the user and generates a JWT
 * 							for authentication on other routes
 * @param uid
 * @param username
 * @returns a JWT for authentication
 */
const generateJWT = (uid: string, username: string): Promise<string> =>
	new Promise((res, rej) => {
		const payload = {
			uid,
			username
		};
		jwt.sign(
			payload,
			process.env.SECRET_KEY as string,
			{
				expiresIn: '24h'
			},
			(error: Error | null, token: string | undefined) => {
				if (error) {
					console.log(error);
					rej("Couldn't generate JWT please check the logs.");
				} else res(token as string);
			}
		);
	});

export const CryptRepository = {
	encryptPassword,
	comparePassword,
	generateJWT
};
