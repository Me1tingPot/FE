import { API_URL } from '@/constants/path';
import { PARTY_LISTS_TYPE, PARTY_TYPES } from '@/types/api';
import { PARTY_DATA } from '@/types/api/types';
import axiosInstance from './axios';

type createPatyProps = {
	subject: string;
	imageKey: string[];
	locationAddress: string;
	locationDetail: string;
	description: string;
	descriptionLanguage: string;
	startTime: string;
	areaId: string;
	partyMinParticipant: number;
	partyMaxParticipant: number;
	locationIsReserved: boolean;
	locationCanBeChanged: boolean;
	isTempSave: boolean;
	locationLatitude: number;
	locationLongitude: number;
};

export type SearchPartyProps = {
	page: number;
	query?: string;
	areaIdFilter?: string;
	temporalFilter?: string[];
	statusFilter?: string;
	coordLeftTopFilter?: {
		latitude: number;
		longitude: number;
	};
	coordRightBottomFilter?: {
		latitude: number;
		longitude: number;
	};
};

type SearchPartyNearbyProps = {
	page: number;
	areaId: string;
};

const getPartyData = async (partyId: number): Promise<PARTY_TYPES> => {
	const { data } = await axiosInstance.get(`${API_URL.PARTY}/${partyId}`);
	return data;
};

const updateParty = async (partyId: number) => {
	const { data } = await axiosInstance.put(`${API_URL.PARTY}/${partyId}`);
	return data;
};

const deleteParty = async (partyId: number) => {
	const { data } = await axiosInstance.delete(`${API_URL.PARTY}/${partyId}`);
	return data;
};

const createParty = async ({ ...partyData }: createPatyProps) => {
	const { data } = await axiosInstance.post(`${API_URL.PARTY}`, {
		...partyData,
	});
	return data;
};

const reportParty = async (partyId: number) => {
	const { data } = await axiosInstance.post(
		`${API_URL.PARTY}/${partyId}/report`,
	);
	return data;
};

const joinParty = async (partyId: number) => {
	const { data } = await axiosInstance.post(`${API_URL.PARTY}/${partyId}/join`);
	return data;
};

const searchParty = async ({
	...searchData
}: SearchPartyProps): Promise<PARTY_LISTS_TYPE> => {
	const { data } = await axiosInstance.post(`${API_URL.PARTY_SEARCH}`, {
		...searchData,
	});
	return data;
};

const searchPartyNearby = async ({ page, areaId }: SearchPartyNearbyProps) => {
	const { data } = await axiosInstance.post(`${API_URL.PARTY_SEARCH_NEARBY}`, {
		page,
		areaId,
	});
	return data;
};

const getTempSavedParty = async () => {
	const { data } = await axiosInstance.get(`${API_URL.GET_TEMP_SAVED_PARTY}`);
	return data;
};

const getPartyImageUrl = async () => {
	const { data } = await axiosInstance.get(`${API_URL.PARTY_IMG_URL}`);
	return data;
};

export {
	getPartyData,
	updateParty,
	deleteParty,
	createParty,
	reportParty,
	joinParty,
	getTempSavedParty,
	getPartyImageUrl,
	searchParty,
	searchPartyNearby,
};
