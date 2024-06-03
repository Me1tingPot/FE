import { useTranslation } from 'react-i18next';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { colors, communityNavigations } from '@/constants';
import CommunityCommentsScreen from '@/screens/community/CommunityCommentsScreen';
import CommunityPostingDetailScreen from '@/screens/community/CommunityPostingDetailScreen';
import CommunityPostingWriteScreen from '@/screens/community/CommunityPostingWriteScreen';
import CommunityQuestionDetailScreen from '@/screens/community/CommunityQuestionDetailScreen';
import CommunityQuestionWriteScreen from '@/screens/community/CommunityQuestionWriteScreen';
import useThemeStore from '@/store/useThemeStore';
import CommunityTopTabNavigator from '../topTab/CommunityTopTabNavigator';

export type CommunityStackParamList = {
	[communityNavigations.COMMUNITY_TOPTAB]: undefined;
	[communityNavigations.COMMUNITY_POSTING_DETAIL]: {
		id: number;
	};
	[communityNavigations.COMMUNITY_QUESTION_DETAIL]: {
		id: number;
	};
	[communityNavigations.COMMUNITY_QUESTION_WRITE]: undefined;
	[communityNavigations.COMMUNITY_POSTING_WRITE]: undefined;
	[communityNavigations.COMMUNITY_COMMENTS]: { id: number };
};

function CommunityStackNavigator() {
	const Stack = createStackNavigator<CommunityStackParamList>();
	const { t } = useTranslation();
	const { theme } = useThemeStore();

	const commonHeaderOptions: StackNavigationOptions = {
		headerStyle: { backgroundColor: colors[theme].WHITE },
		headerTitleStyle: { color: colors[theme].BLACK },
		headerLeftLabelVisible: false,
		headerShadowVisible: false,
		headerTitleAlign: 'center',
		headerTintColor: colors[theme].BLACK,
	};

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_TOPTAB}
				component={CommunityTopTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_QUESTION_DETAIL}
				component={CommunityQuestionDetailScreen}
				options={{
					headerTitle: `${t('질문')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_POSTING_DETAIL}
				component={CommunityPostingDetailScreen}
				options={{
					headerTitle: `${t('포스팅')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_QUESTION_WRITE}
				component={CommunityQuestionWriteScreen}
				options={{
					headerTitle: `${t('질문하기')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_POSTING_WRITE}
				component={CommunityPostingWriteScreen}
				options={{
					headerTitle: `${t('포스팅')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_COMMENTS}
				component={CommunityCommentsScreen}
				options={{ headerTitle: '댓글', ...commonHeaderOptions }}
			/>
		</Stack.Navigator>
	);
}

export default CommunityStackNavigator;
