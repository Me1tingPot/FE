import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/root/RootNavigator';

function App() {
	const { theme } = useThemeStorage();
	const getFcmToken = async () => {
		try {
			const fcmToken = await messaging().getToken();
			console.log('[FCM Token] ', fcmToken);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getFcmToken();
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			console.log('[Remote Message] ', JSON.stringify(remoteMessage));
		});
		return unsubscribe;
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</QueryClientProvider>
	);
}

export default App;
