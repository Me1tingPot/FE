const queryKeys = {
	AUTH: 'auth',
	REFRESH_TOKEN: 'refreshToken',
	GET_ACCESS_TOKEN: 'getAccessToken',
} as const;

const storageKeys = {
	REFRESH_TOKEN: 'refreshToken',
	THEME_TOKEN: 'themeToken',
	THEME_SYSTEM: 'themeSystem',
	THEME_MODE: 'themeMode',
} as const;

export { queryKeys, storageKeys };
