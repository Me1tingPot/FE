import {
	LOGIN_DATA_TYPES,
	PROFILE_URL_DATA_TYPES,
	SIGNUP_DATA_TYPES,
	USER_PROFILE_DATA_TYPES,
} from './types';

export type RETURN_TYPES = {
	code: string;
	detail: string;
	status: string;
	timestamp: string;
};

// 서버 오류 반환값 확인 필요
export type LOGIN_TYPES = RETURN_TYPES & {
	data: LOGIN_DATA_TYPES;
};

export type SIGNUP_TYPES = RETURN_TYPES & {
	data: SIGNUP_DATA_TYPES;
};

export type PROFILE_URL_TYPES = RETURN_TYPES & {
	data: PROFILE_URL_DATA_TYPES;
};

export type USER_PROFILE_TYPES = RETURN_TYPES & {
	data: USER_PROFILE_DATA_TYPES;
};
