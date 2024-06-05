import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/root/RootNavigator';

const linking = {
	prefixes: ['meltingpot://'],
	config: {
		screens: {
			FeedTab: 'FeedTab',
			Alert: 'Alert',
			ChatStart: 'ChatStart',
			CommunityQuestionDetail: 'CommunityQuestionDetail',
			CommunityPostingDetail: 'CommunityPostingDetail',
			PartyDetail: 'PartyDetail',
			UserProfile: 'UserProfile',
		},
	},
};

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
			<GestureHandlerRootView>
				<NavigationContainer linking={linking}>
					<RootNavigator />
				</NavigationContainer>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

export default App;
