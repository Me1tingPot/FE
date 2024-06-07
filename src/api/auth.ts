import { API_URL } from '@/constants/path';
import { LOGIN_TYPES } from '@/types/api';
import axiosInstance from './axios';

const login = async (email: string, password: string): Promise<LOGIN_TYPES> => {
	const res = await axiosInstance.post(
		`${process.env.API_URL}/${API_URL.LOGIN}`,
		{
			email: email,
			password: password,
		},
	);
	// console.log(res.data);
	return res.data;
};

export { login };
