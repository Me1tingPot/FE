import { API_URL } from '@/constants/path';
import axiosInstance from './axios';

const postMail = async ({ email }: { email: string }) => {
	const { data } = await axiosInstance.post(`${API_URL.POST_MAIL}`, {
		email,
	});
	console.log(data);
	return data;
};

export { postMail };
