export type TOKEN_DTO = {
	accessToken: string;
	accessTokenExpiresIn: string;
	grantType: string;
	refreshToken: string;
};

export type LOGIN_DATA_TYPES = {
	email: string;
	id: number;
	name: string;
	tokenDto: TOKEN_DTO;
};
