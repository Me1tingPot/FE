import { createStackNavigator } from '@react-navigation/stack';
import { communityNavigations } from '@/constants';
import CommunityPostingDetailScreen from '@/screens/community/CommunityPostingDetailScreen';
import CommunityPostingWriteScreen from '@/screens/community/CommunityPostingWriteScreen';
import CommunityQuestionDetailScreen from '@/screens/community/CommunityQuestionDetailScreen';
import CommunityQuestionWriteScreen from '@/screens/community/CommunityQuestionWriteScreen';
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
};
function CommunityStackNavigator() {
	const Stack = createStackNavigator<CommunityStackParamList>();

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
				options={{ headerTitle: '질문' }}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_POSTING_DETAIL}
				component={CommunityPostingDetailScreen}
				options={{ headerTitle: '포스팅' }}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_QUESTION_WRITE}
				component={CommunityQuestionWriteScreen}
				options={{ headerTitle: '질문하기' }}
			/>
			<Stack.Screen
				name={communityNavigations.COMMUNITY_POSTING_WRITE}
				component={CommunityPostingWriteScreen}
				options={{ headerTitle: '포스팅하기' }}
			/>
		</Stack.Navigator>
	);
}

export default CommunityStackNavigator;
