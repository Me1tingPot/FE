export type IMAGE_DTO = {
	imageKey: string;
	thumbnail: boolean;
};

export type TOKEN_DTO = {
	accessToken: string;
	accessTokenExpiresIn: number;
	grantType: string;
	refreshToken: string;
};

export type LOGIN_DATA_TYPES = {
	email: string;
	id: number;
	name: string;
	tokenDto: TOKEN_DTO;
};

export type SIGNUP_DATA_TYPES = {
	id: number;
	email: string;
	name: string;
	tokenDto: TOKEN_DTO;
};

export type PROFILE_URL_DATA_TYPES = {
	uploadUrl: string;
	fileKey: string;
};

export type BASE_API_KEY = {
	timestamp: string,
  code: string,
  status: string,
  detail: string
}

export type INFINITE_META_DATA = {
	isFirst: boolean;
	hasNext: boolean;
}