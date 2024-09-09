const VERSION = 'v1';
const API = 'api';

const API_BASE = {
	AUTH: `auth`,
	MAIL: `mail`,
	USER: `user`,
	CHAT_ROOM: `chatRooms`,
	POSTS: `posts`,
	PARTY: `party`,
	AREA: `area`,
	SEARCH: `search`,
};

const API_URL = {
	// auth-controller
	LOGIN: `/${API}/${VERSION}/${API_BASE.AUTH}/signin`,
	SIGNUP: `/${API}/${VERSION}/${API_BASE.AUTH}/signup`,
	LOGOUT: `/${API}/${VERSION}/${API_BASE.AUTH}/signout`,
	AUTH_PROFILE_IMG_URL: `/${API}/${VERSION}/${API_BASE.AUTH}/image-url`,
	REISSUE_TOKEN: `/${API}/${VERSION}/${API_BASE.AUTH}/reissue-token`,

	// mail-controller
	POST_MAIL: `/${API}/${VERSION}/${API_BASE.MAIL}`,
	MAIL_VERIFICATION: `/${API}/${VERSION}/${API_BASE.MAIL}/verification`,
	MAIL_DEPLICATION: `/${API}/${VERSION}/${API_BASE.MAIL}/duplication`,

	// user-controller
	USER_PROFILE: `/${API}/${VERSION}/${API_BASE.USER}`,
	USER_PROFILE_IMG: `/${API}/${VERSION}/${API_BASE.USER}/images`,
	USER_PROFILE_IMG_URL: `/${API}/${VERSION}/${API_BASE.USER}/image-url`,
	USER_NAME: `/${API}/${VERSION}/${API_BASE.USER}/name`,
	USER_BIO: `/${API}/${VERSION}/${API_BASE.USER}/bio`,

	// chat-controller
	GET_CHAT_ROOMS: `/${API}/${VERSION}/${API_BASE.CHAT_ROOM}`,
	POST_CHANGE_ALARM_STATUS: `/${API}/${VERSION}/${API_BASE.CHAT_ROOM}/alarm`,
	GET_CHAT_CONTENT: `/${API}/${VERSION}/${API_BASE.CHAT_ROOM}/chat`,
	DELETE_CHAT_ROOM: `//${API}/${VERSION}/${API_BASE.CHAT_ROOM}`,

	// post-controller
	POST: `/${API}/${VERSION}/${API_BASE.POSTS}`,
	GET_POSTS_LIST: `${API}/${VERSION}/${API_BASE.POSTS}/type`,
	GET_POST_DETAIL: `${API}/${VERSION}/${API_BASE.POSTS}`,

	// party-controller
	PARTY: `/${API}/${VERSION}/${API_BASE.PARTY}`,
	GET_TEMP_SAVED_PARTY: `/${API}/${VERSION}/${API_BASE.PARTY}/temp-saved`,
	PARTY_IMG_URL: `/${API}/${VERSION}/${API_BASE.PARTY}/image-url`,

	// party-search-controller
	PARTY_SEARCH: `/${API}/${VERSION}/${API_BASE.SEARCH}`,
	PARTY_SEARCH_NEARBY: `/${API}/${VERSION}/${API_BASE.SEARCH}/nearby`,

	// area-controller
	AREA: `${API}/${VERSION}/${API_BASE.AREA}`,
	AREA_SEARCH: `${API}/${VERSION}/${API_BASE.AREA}/search-by-coord`,
};

export { VERSION, API_BASE, API_URL };
