import { UserData } from '../validations/types';
import { UserRepository } from './repo';

/**
 * @description This is the adapter layer for the function of the same name in repo.ts
 * @param user
 * @returns
 */
const create = (user: UserData) => {
	return UserRepository.create(user);
};

/**
 * @description This is the adapter layer for the function of the same name in repo.ts
 * @param email
 * @returns
 */
const find = (email: string) => {
	return UserRepository.find(email);
};

export const UserDomain = {
	create,
	find
};
