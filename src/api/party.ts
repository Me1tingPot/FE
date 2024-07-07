import { API_URL } from '@/constants/path';
import axiosInstance from './axios';

const getPartyData = async (partyId: number) => {
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

const createParty = async () => {
	const { data } = await axiosInstance.post(`${API_URL.PARTY}`);
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
};
