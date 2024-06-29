import { API_URL } from '@/constants/path';
import { USER_PROFILE_TYPES } from '@/types/api';
import axiosInstance from './axios';

const getUserProfile = async (): Promise<USER_PROFILE_TYPES> => {
	const { data } = await axiosInstance.get(`${API_URL.USER_PROFILE}`);
	return data;
};

export { getUserProfile };
