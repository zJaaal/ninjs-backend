import { Difficult } from '../../utils/types';
import { Profile, UserData } from '../validations/types';
import { UserRepository } from './repo';

/**
 * @description This function communicates to the database and creates an user
 * @param user
 * @returns returns the object that MongoDB generates
 */
const create = (user: UserData) => {
	return UserRepository.create(user);
};

/**
 * @description This function communicates to the database and finds an user by email
 * @param email
 * @returns
 */
const find = (email: string) => {
	return UserRepository.find(email);
};

/**
 *
 * @param uid
 * @returns The progress of an user
 */
const getProgress = (uid: string) => {
	return UserRepository.getProgress(uid);
};

/**
 * @description This function push one progress to the user
 * @param uid
 * @param questionID
 * @param difficult
 * @param completed
 * @returns
 */
const pushProgress = (
	uid: string,
	questionID: string,
	difficult: Difficult,
	completed: boolean
) => {
	return UserRepository.pushProgress(uid, questionID, difficult, completed);
};

/**
 * @description This function update one progress on an user
 * @param uid
 * @param questionID
 * @param completed
 * @returns
 */
const updateProgress = (
	uid: string,
	questionID: string,
	completed: boolean
) => {
	return UserRepository.updateProgress(uid, questionID, completed);
};

/**
 * @description This function finds one user an updates it profile
 * @param profile
 * @returns
 */
const updateProfile = (profile: Profile) => {
	return UserRepository.updateProfile(profile);
};

export const Users = {
	create,
	find,
	getProgress,
	pushProgress,
	updateProgress,
	updateProfile
};
