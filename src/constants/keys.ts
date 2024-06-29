const queryKeys = {
	AUTH: 'auth',
	REFRESH_TOKEN: 'refreshToken',
	GET_ACCESS_TOKEN: 'getAccessToken',
	USER: 'user',
} as const;

const storageKeys = {
	REFRESH_TOKEN: 'refreshToken',
	ACCESS_TOKEN: 'accessToken',
	THEME_TOKEN: 'themeToken',
	THEME_SYSTEM: 'themeSystem',
	THEME_MODE: 'themeMode',
} as const;

export { queryKeys, storageKeys };
