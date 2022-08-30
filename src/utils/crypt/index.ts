import { CryptRepository } from './repo';

/**
 * @description This is the adapter layer for the function of the same name in repo.ts
 * @param password
 * @returns
 */
const encryptPassword = (password: string) => {
	//Here you can add validations
	return CryptRepository.encryptPassword(password);
};

/**
 * @description This is the adapter layer for the function of the same name in repo.ts
 * @param password
 * @param toCompare
 * @returns
 */
const comparePassword = (password: string, toCompare: string) => {
	//Here you can add validations
	return CryptRepository.comparePassword(password, toCompare);
};

/**
 * @description This is the adapter layer for the function of the same name in repo.ts
 * @param uid
 * @param username
 * @returns
 */
const generateJWT = (uid: string, username: string): Promise<string> => {
	//Here you can add validations
	return CryptRepository.generateJWT(uid, username);
};

export const Crypt = {
	encryptPassword,
	comparePassword,
	generateJWT
};
