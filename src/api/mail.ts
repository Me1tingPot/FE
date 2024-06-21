import { API_URL } from '@/constants/path';
import axiosInstance from './axios';

type CheckMailProps = {
	email: string;
	code: string;
};

const postMail = async ({ email }: { email: string }) => {
	const { data } = await axiosInstance.post(`${API_URL.POST_MAIL}`, {
		email,
	});
	return data;
};

const verificationMail = async ({ email, code }: CheckMailProps) => {
	const { data } = await axiosInstance.post(`${API_URL.MAIL_VERIFICATION}`, {
		email,
		code,
	});
	return data;
};

export { postMail, verificationMail };
