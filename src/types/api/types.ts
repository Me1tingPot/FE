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
