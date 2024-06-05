import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);
	// 사용자가 허용 후, 앱으로 다시 돌아온 상태값 설정.
	const [isComeback, setIsComeback] = useState(false);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (
				// 앱의 상태가 비활성화, 백그라운드 그 이후에 active 상태라면?
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				// 사용자가 다시 돌아왔다고 볼 수 있음
				setIsComeback(true);
			}
			// 이떄는, 사용자가 돌아온 것이 아니기에 false로.
			if (appState.current.match(/active/) && nextAppState === 'background') {
				setIsComeback(false);
			}

			appState.current = nextAppState;
			setAppStateVisible(appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return { isComeback };
};

export default useAppState;
