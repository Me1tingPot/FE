import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import ChatHomeHeaderLeft from '@/components/chat/ChatHomeHeaderLeft';
import {
	colors,
	communityNavigations,
	feedNavigations,
	partyNavigations,
	userNavigations,
} from '@/constants';
import AlertHomeScreen from '@/screens/alert/AlertHomeScreen';
import ChatHomeScreen from '@/screens/chat/ChatHomeScreen';
import ChatScreen from '@/screens/chat/ChatScreen';
import ChatStartScreen from '@/screens/chat/ChatStartScreen';
import CommunityPostingDetailScreen from '@/screens/community/CommunityPostingDetailScreen';
import CommunityQuestionDetailScreen from '@/screens/community/CommunityQuestionDetailScreen';
import PartyDetailScreen from '@/screens/party/PartyDetailScreen';
import UserProfileScreen from '@/screens/user/UserProfileScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import FeedTabNavigator from '../tab/FeedTabNavigator';

export type FeedStackParamList = {
	[feedNavigations.ALERT]: undefined;
	[feedNavigations.FEED_TAB]: undefined;
	[feedNavigations.CHAT_START]: undefined;
	[feedNavigations.CHAT_HOME]: undefined;
	[feedNavigations.CHAT]: { id: number };
	[communityNavigations.COMMUNITY_POSTING_DETAIL]: { id: number };
	[communityNavigations.COMMUNITY_QUESTION_DETAIL]: { id: number };
	[partyNavigations.PARTY_DETAIL]: { id: number };
	[userNavigations.USER_PROFILE]: { id: number };
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
			<Stack.Screen
				name={communityNavigations.COMMUNITY_POSTING_DETAIL}
				component={CommunityPostingDetailScreen}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_QUESTION_DETAIL}
				component={CommunityQuestionDetailScreen}
			/>
			<Stack.Screen
				name={partyNavigations.PARTY_DETAIL}
				component={PartyDetailScreen}
			/>
			<Stack.Screen
				name={userNavigations.USER_PROFILE}
				component={UserProfileScreen}
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
