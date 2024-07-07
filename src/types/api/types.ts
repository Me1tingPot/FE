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

export type BASE_API_KEY = {
	timestamp: string;
	code: string;
	status: string;
	detail: string;
};

export type INFINITE_META_DATA = {
	isFirst: boolean;
	hasNext: boolean;
};

export type POST_DTO = {
	postId: number;
	name: string;
	title: string;
	content: string;
	commentCount: number;
	updatedAt: string;
};

export type POST_DATA = {
	pageDtos: POST_DTO[];
	nextCursor: number;
	isLast: boolean;
};

export type OWNER_DTO = {
	name: string;
	introduction: string;
	nationality: string;
	country: string;
	language: string[];
	city: string;
	profileImages: string[];
	partyParticipantCount: number;
	partyCreationCount: number;
};

type PARTICIPANTS_TYPE = {
	name: string;
};

type CONTENTS_TYPE = {
	lang: string;
	content: string;
};

export type PARTY_DATA = {
	id: number;
	owner: OWNER_DTO;
	subject: string;
	partyStatus: string;
	startTime: string;
	locationAddress: string;
	locationDetail: string;
	locationReserved: boolean;
	locationCanBeChanged: boolean;
	minParticipant: number;
	maxParticipant: number;
	participants: PARTICIPANTS_TYPE[];
	contents: CONTENTS_TYPE[];
};
