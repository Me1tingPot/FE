import { LOGIN_DATA_TYPES } from './types';

// 서버 오류 반환값 확인 필요
export type LOGIN_TYPES = {
	code: 'SIGNIN_SUCCESS';
	data: LOGIN_DATA_TYPES;
	detail: string;
	status: 'OK';
	timestamp: string;
};
