import { Profile, UserData } from '../validations/types';
import User from '../validations/models/User';
import { Difficult } from '../../utils/types';

/**
 * @description This function communicates to the database and creates an user
 * @param user
 * @returns returns the object that MongoDB generates
 */
const create = (user: UserData) => {
	const userModel = new User(user);
	userModel.save();

	return userModel;
};

/**
 * @description This function communicates to the database and finds an user by email
 * @param email
 * @returns
 */
const find = (email: string) => {
	return User.findOne({ email: email }).exec();
};

/**
 *
 * @param uid
 * @returns The progress of an user
 */
const getProgress = (uid: string) => {
	return User.findOne({ _id: uid }).select(['progress', '-_id']).exec();
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
	return User.updateOne(
		{ _id: uid },
		{
			$push: {
				progress: {
					questionID,
					difficult,
					completed
				}
			}
		}
	);
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
	return User.updateOne(
		{ _id: uid, 'progress.questionID': questionID },
		{
			$set: {
				'progress.$.completed': completed
			}
		}
	);
};

/**
 * @description This function finds one user an updates it profile
 * @param profile
 * @returns
 */
const updateProfile = (profile: Profile) => {
	return User.findOneAndUpdate(
		{ _id: profile.uid },
		{ variant: profile.variant, username: profile.username },
		{ new: true }
	);
};
export const UserRepository = {
	create,
	find,
	getProgress,
	pushProgress,
	updateProgress,
	updateProfile
};
