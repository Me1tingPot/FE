const VERSION = 'v1';
const API = 'api';

const API_BASE = {
	AUTH: `auth`,
	MAIL: `mail`,
	USER: `user`,
};

const API_URL = {
	// auth-controller
	LOGIN: `/${API}/${VERSION}/${API_BASE.AUTH}/signin`,
	SIGNUP: `/${API}/${VERSION}/${API_BASE.AUTH}/signup`,
	LOGOUT: `/${API}/${VERSION}/${API_BASE.AUTH}/signout`,
	PROFILE_IMG_URL: `/${API}/${VERSION}/${API_BASE.AUTH}/image-url`,
	REISSUE_TOKEN: `/${API}/${VERSION}/${API_BASE.AUTH}/reissue-token`,

	// mail-controller
	POST_MAIL: `/${API}/${VERSION}/${API_BASE.MAIL}`,
	MAIL_VERIFICATION: `/${API}/${VERSION}/${API_BASE.MAIL}/verification`,
	MAIL_DEPLICATION: `/${API}/${VERSION}/${API_BASE.MAIL}/duplication`,

	//user-controller
	USER_PROFILE: `/${API}/${VERSION}/${API_BASE.USER}`,
	USER_PROFILE_IMG: `/${API}/${VERSION}/${API_BASE.USER}/images`,
	USER_PROFILE_IMG_URL: `/${API}/${VERSION}/${API_BASE.USER}/image-url`,
	USER_NAME: `/${API}/${VERSION}/${API_BASE.USER}/name`,
	USER_BIO: `/${API}/${VERSION}/${API_BASE.USER}/bio`,
};

export { VERSION, API_BASE, API_URL };
