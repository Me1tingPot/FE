import { API_URL } from '@/constants/path';
import { PROFILE_URL_TYPES } from '@/types/api';
import axiosInstance from './axios';

type RequestProfileurl = {
	uploadUrl: string;
	body: FormData;
};

const uploadImages = async (body: FormData): Promise<string[]> => {
	const { data } = await axiosInstance.post('/images', body, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return data;
};

const getProfileUploadUrl = async (): Promise<PROFILE_URL_TYPES> => {
	const { data } = await axiosInstance.get(`${API_URL.PROFILE_IMG_URL}`);

	return data;
};

const uploadProfileImages = async ({
	uploadUrl,
	body,
}: RequestProfileurl): Promise<any> => {
	const { data } = await axiosInstance.put(uploadUrl, body, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return data;
};

export { uploadImages, getProfileUploadUrl, uploadProfileImages };
