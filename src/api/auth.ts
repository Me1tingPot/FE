import Config from 'react-native-config';
import { string } from 'zod';
import { API_URL } from '@/constants/path';
import { LOGIN_TYPES } from '@/types/api';
import { IMAGE_DTO } from '@/types/api/types';
import axiosInstance from './axios';

export type signupProps = {
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
			email: email,
			password: password,
		},
	);
	console.log(data);
	return data;
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
			username: username,
			password: password,
			name: name,
			gender: gender,
			birth: birth,
			nationality: nationality,
			languages: languages,
			profileImages: profileImages,
		},
	);
	return data;
};

export { login, signup };
