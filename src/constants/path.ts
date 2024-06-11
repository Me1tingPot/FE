const VERSION = 'v1';
const API = 'api';

const API_BASE = {
	AUTH: `auth`,
};

const API_URL = {
	// auth-controller
	LOGIN: `/${API}/${VERSION}/${API_BASE.AUTH}/signin`,
	SIGNUP: `/${API}/${VERSION}/${API_BASE.AUTH}/signup`,
	LOGOUT: `/${API}/${VERSION}/${API_BASE.AUTH}/signout`,
	PROFILE_IMG_URL: `/${API}/${VERSION}/${API_BASE.AUTH}/image-url`,
	REISSUE_TOKEN: `/${API}/${VERSION}/${API_BASE.AUTH}/reissue-token`,
};

export { VERSION, API_BASE, API_URL };
