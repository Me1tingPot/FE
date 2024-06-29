import { API_URL } from '@/constants/path';
import { USER_PROFILE_TYPES } from '@/types/api';
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

export { getUserProfile, changeUserBio, changeUserName };
