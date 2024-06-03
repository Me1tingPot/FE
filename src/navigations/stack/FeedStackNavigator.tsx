import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import ChatHomeHeaderLeft from '@/components/chat/ChatHomeHeaderLeft';
import { colors, feedNavigations } from '@/constants';
import AlertHomeScreen from '@/screens/alert/AlertHomeScreen';
import ChatHomeScreen from '@/screens/chat/ChatHomeScreen';
import ChatScreen from '@/screens/chat/ChatScreen';
import ChatStartScreen from '@/screens/chat/ChatStartScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import FeedTabNavigator from '../tab/FeedTabNavigator';

export type FeedStackParamList = {
	[feedNavigations.ALERT]: undefined;
	[feedNavigations.FEED_TAB]: undefined;
	[feedNavigations.CHAT_START]: undefined;
	[feedNavigations.CHAT_HOME]: undefined;
	[feedNavigations.CHAT]: { id: number };
};

function FeedStackNavigator() {
	const Stack = createStackNavigator<FeedStackParamList>();
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const commonHeaderOptions: StackNavigationOptions = {
		headerTitleAlign: 'center',
		headerBackTitleVisible: false,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: colors[theme].WHITE,
		},
		headerTitleStyle: {
			color: colors[theme].BLACK,
		},
		headerTintColor: colors[theme].BLACK,
	};

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={feedNavigations.FEED_TAB}
				component={FeedTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={feedNavigations.ALERT}
				component={AlertHomeScreen}
				options={{
					headerTitle: `${t('알림')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={feedNavigations.CHAT_START}
				component={ChatStartScreen}
				options={({ navigation }) => ({
					headerLeft: () => ChatHomeHeaderLeft(navigation),
					headerTitle: '',
					headerShadowVisible: false,
				})}
			/>
			<Stack.Screen
				name={feedNavigations.CHAT_HOME}
				component={ChatHomeScreen}
				options={{
					headerTitle: '',
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={feedNavigations.CHAT}
				component={ChatScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		close: {
			margin: 10,
		},
	});

export default FeedStackNavigator;
