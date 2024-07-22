import { storageKeys } from '@/constants';
import { API_URL } from '@/constants/path';
import { LOGIN_TYPES } from '@/types/api';
import { IMAGE_DTO } from '@/types/api/types';
import { getEncryptStorage } from '@/utils';
import axiosInstance from './axios';

type signupProps = {
	email: string;
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
	const { data } = await axiosInstance.post(`${API_URL.LOGIN}`, {
		email,
		password,
	});
	// console.log(data);

	return data;
};

type SocialRequestUser = {
	type: 'KAKAO' | 'APPLE | "GOOGLE';
	code: string;
	pushToken: string;
};

type ResponseSocialToken = {
	timestamp: string;
	code: string;
	status: string;
	detail: string;
	data: {
		grantType: string;
		accessToken: string;
		accessTokenExpiresIn: number;
		refreshToken: string;
	};
};

const socialLogin = async ({
	type,
	code,
	pushToken,
}: SocialRequestUser): Promise<ResponseSocialToken> => {
	const { data } = await axiosInstance.post(`${API_URL.SOCIAL_LOGIN}`, {
		type,
		code,
		pushToken,
	});

	return data;
};

const logout = async () => {
	const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);

	await axiosInstance.get(`${API_URL.LOGOUT}?refresh-token=${refreshToken}`);
};

const signup = async ({
	email,
	password,
	name,
	gender,
	birth,
	nationality,
	languages,
	profileImages,
}: signupProps) => {
	const { data } = await axiosInstance.post(`${API_URL.SIGNUP}`, {
		email,
		password,
		name,
		gender,
		birth,
		nationality,
		languages,
		profileImages,
	});
	return data;
};

type ResponseToken = {
	timestamp: string;
	code: string;
	status: string;
	detail: string;
	data: {
		accountId: number;
		accessToken: string;
		refreshToken: string;
	};
};

const getAccessToken = async (): Promise<ResponseToken> => {
	const refreshToken = await getEncryptStorage(storageKeys.REFRESH_TOKEN);
	const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);

	const headers = {
		RefreshToken: refreshToken,
		Authorization: `Bearer ${accessToken}`,
	};

	console.log(headers);

	const { data } = await axiosInstance.post(
		`${API_URL.REISSUE_TOKEN}`,
		{},
		{ headers },
	);
	// console.log('데이터', data);

	return data;
};

export { login, logout, signup, getAccessToken, socialLogin };
export type { signupProps, RequestUser, ResponseToken };
