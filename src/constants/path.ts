const VERSION = 'v1';

const API_BASE = {
	AUTH: `auth`,
};

const API_URL = {
	// auth-controller
	LOGIN: `/${API_BASE.AUTH}/signin`,
	SIGNUP: `/${API_BASE.AUTH}/signup`,
	LOGOUT: `/${API_BASE.AUTH}/signout`,
	PROFILE_IMG_URL: `/${API_BASE.AUTH}/image-url`,
	REISSUE_TOKEN: `/${API_BASE.AUTH}/reissue-token`,
};

export { VERSION, API_BASE, API_URL };
