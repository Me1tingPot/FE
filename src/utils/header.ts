import axiosInstance from '@/api/axios';

function setHeader(key: string, value: string) {
	console.log("세팅", value, key)
	axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
	if (!axiosInstance.defaults.headers.common[key]) {
		return;
	}

	delete axiosInstance.defaults.headers.common[key];
}

export { setHeader, removeHeader };
