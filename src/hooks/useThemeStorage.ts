import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getEncryptStorage, setEncryptStorage } from '@/utils';

function useThemeStorage() {
	// Default System Theme Value
	// light | dark | null | undefined
	const systemTheme = useColorScheme();
	const { theme, isSystem, setTheme, setSystemTheme } = useThemeStore();

	/**
	 * AsyncStorage도 OK 하지만, 로그인시 EncryptStorage를 사용하기에 그냥 해당 라이브러리 사용.
	 */
	const setMode = async (mode: ThemeMode) => {
		await setEncryptStorage('themeMode', mode);
		// 전역적 상태 변경
		setTheme(mode);
	};

	const setSystem = async (flag: boolean) => {
		await setEncryptStorage('themeSystem', flag);
		// 전역적 상태 변경
		setSystemTheme(flag);
	};

	// 앱이 꺼져도, 스토리지 값을 읽어와서 상태 변경 할 수 있게하는 코드.
	useEffect(() => {
		(async () => {
			const mode = (await getEncryptStorage('themeMode')) ?? 'light';
			const systemMode = (await getEncryptStorage('themeSystem')) ?? 'false';
			const newMode = systemMode ? systemTheme : mode;
			setTheme(newMode);
			setSystemTheme(systemMode);
		})();
	}, [setTheme, setSystemTheme, systemTheme]);

	return { theme, isSystem, setMode, setSystem };
}

export default useThemeStorage;
