import { LOGIN_DATA_TYPES, SIGNUP_DATA_TYPES } from './types';

// 서버 오류 반환값 확인 필요
export type LOGIN_TYPES = {
	code: string;
	data: LOGIN_DATA_TYPES;
	detail: string;
	status: string;
	timestamp: string;
};

export type SIGNUP_TYPES = {
	code: string;
	data: SIGNUP_DATA_TYPES;
	detail: string;
	status: string;
	timestamp: string;
};
