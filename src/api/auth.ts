import Config from 'react-native-config';
import { API_URL } from '@/constants/path';
import { LOGIN_TYPES } from '@/types/api';
import { IMAGE_DTO } from '@/types/api/types';
import { getEncryptStorage } from '@/utils';
import axiosInstance from './axios';

type signupProps = {
	username: string;
	password: string;
	name: string;
	gender: string;
	birth: string;
	nationality: string;
	languages: string[];
	profileImages: IMAGE_DTO[];
};

type RequestUser = {
	email: string;
	password: string;
};

const login = async ({
	email,
	password,
}: RequestUser): Promise<LOGIN_TYPES> => {
	const { data } = await axiosInstance.post(
		`${Config.API_URL}/${API_URL.LOGIN}`,
		{
			email,
			password,
		},
	);

	return data;
};

const logout = async () => {
	await axiosInstance.delete('/auth/signout');
};

const signup = async ({
	username,
	password,
	name,
	gender,
	birth,
	nationality,
	languages,
	profileImages,
}: signupProps) => {
	const { data } = await axiosInstance.post(
		`${Config.API_URL}/${API_URL.SIGNUP}`,
		{
			username,
			password,
			name,
			gender,
			birth,
			nationality,
			languages,
			profileImages,
		},
	);
	return data;
};

type ResponseToken = {
	accessToken: string;
	refreshToken: string;
};

const getAccessToken = async (): Promise<ResponseToken> => {
	const refreshToken = await getEncryptStorage('refreshToken');

	const { data } = await axiosInstance.get('/auth/reissue-token', {
		headers: {
			Authorization: `Bearer ${refreshToken}`,
		},
	});
	console.log(data);
	return data;
};

export { login, logout, signup, getAccessToken };
export type { signupProps, RequestUser, ResponseToken };
