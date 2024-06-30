import { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, {
	BaseToast,
	BaseToastProps,
	ErrorToast,
} from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { colors } from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/root/RootNavigator';

/*
  1. Create the config
*/
const toastConfig = {
	/*
	  Overwrite 'success' type,
	  by modifying the existing `BaseToast` component
	*/
	success: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'pink' }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 15,
				fontWeight: '400',
			}}
		/>
	),
	/*
	  Overwrite 'error' type,
	  by modifying the existing `ErrorToast` component
	*/
	error: (props: BaseToastProps) => (
		<ErrorToast
			{...props}
			text1Style={{
				fontSize: 17,
			}}
			text2Style={{
				fontSize: 15,
			}}
		/>
	),
};

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
	const [token, setToken] = useState();
	console.log(token, 'token');

	const getFcmToken = async () => {
		try {
			const fcmToken = await messaging().getToken();
			console.log('[FCM Token] ', fcmToken);
			setToken(fcmToken);
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
					<Toast config={toastConfig} />
				</NavigationContainer>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

export default App;
