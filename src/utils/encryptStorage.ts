import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * https://www.npmjs.com/package/react-native-encrypted-storage (similar to Web Local Storage)
 */

const setEncryptStorage = async <T>(key: string, data: T) => {
	await EncryptedStorage.setItem(key, JSON.stringify(data));
};

const getEncryptStorage = async (key: string) => {
	const storedData = await EncryptedStorage.getItem(key);

	return storedData ? JSON.parse(storedData) : null;
};

const removeEncryptStorage = async (key: string) => {
	const data = await getEncryptStorage(key);

	if (data) {
		await EncryptedStorage.removeItem(key);
	}
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
