import { storageKeys } from '@/constants';
import { API_URL } from '@/constants/path';
import { USER_PROFILE_TYPES } from '@/types/api';
import { getEncryptStorage } from '@/utils';
import axiosInstance from './axios';

const getUserProfile = async (): Promise<USER_PROFILE_TYPES> => {
	const { data } = await axiosInstance.get(`${API_URL.USER_PROFILE}`);
	return data;
};

const changeUserBio = async (bio: { bio: string }) => {
	const { data } = await axiosInstance.patch(`${API_URL.USER_BIO}`, {
		bio,
	});
	return data;
};

const changeUserName = async (nickname: { nickname: string }) => {
	const { data } = await axiosInstance.patch(`${API_URL.USER_NAME}`, {
		nickname,
	});
	return data;
};

const getUserProfileImages = async () => {
	const accountId = await getEncryptStorage(storageKeys.ACCOUNT_ID);

	const { data } = await axiosInstance.get(
		`${API_URL.USER_PROFILE_IMG}/${accountId}`,
	);
	return data;
};

const deleteUserProfileImg = async (imageId: number) => {
	const { data } = await axiosInstance.delete(
		`${API_URL.USER_PROFILE_IMG}/${imageId}`,
	);
	return data;
};

export {
	getUserProfile,
	changeUserBio,
	changeUserName,
	getUserProfileImages,
	deleteUserProfileImg,
};
