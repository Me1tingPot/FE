import { API_URL } from '@/constants/path';
import { AREA_TYPE } from '@/types/api';
import axiosInstance from './axios';

interface SearchAreaByCoordProps {
	latitude: number;
	longitude: number;
}

const getChildArea = async (parentAreaId: string): Promise<AREA_TYPE> => {
	const { data } = await axiosInstance.get(`${API_URL.AREA}/${parentAreaId}`);
	return data;
};

const getParentArea = async (areaId: string) => {
	const { data } = await axiosInstance.get(`${API_URL.AREA}/${areaId}/parent`);
	return data;
};

const searchAreaByCoord = async ({
	latitude,
	longitude,
}: SearchAreaByCoordProps) => {
	const { data } = await axiosInstance.get(
		`${API_URL.AREA_SEARCH}?latitude=${latitude}&longitude=${longitude}`,
	);
	return data;
};

const getArea = async (): Promise<AREA_TYPE> => {
	const { data } = await axiosInstance.get(`${API_URL.AREA}/`);
	return data;
};

export { getChildArea, getParentArea, searchAreaByCoord, getArea };
