export type IMAGE_DTO = {
	imageKey: string;
	thumbnail: boolean;
};

export type PROFILE_IMAGES_DATA_TYPES = {
	id: number;
	imageUrl: string;
	sequence: number;
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

export type USER_PROFILE_DATA_TYPES = {
	id: number;
	name: string;
	email: string;
	bio: string | null;
	host_count: number;
	participate_count: number;
	nationality: string;
	thumbnail: string;
};
