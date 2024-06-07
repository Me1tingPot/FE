import { API_URL } from '@/constants/path';
import axiosInstance from './axios';

const login = async () => {
	const res = await axiosInstance.post(
		`${process.env.API_URL}/${API_URL.LOGIN}`,
	);
	console.log(res);
};

export { login };
