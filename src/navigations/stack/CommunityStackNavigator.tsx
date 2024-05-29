import { createStackNavigator } from '@react-navigation/stack';
import { communityNavigations } from '@/constants';
import CommunityPostingDetailScreen from '@/screens/community/CommunityPostingDetailScreen';
import CommunityTopTabNavigator from '../topTab/CommunityTopTabNavigator';

export type CommunityStackParamList = {
	[communityNavigations.COMMUNITY_TOPTAB]: undefined;
	[communityNavigations.COMMUNITY_POSTING_DETAIL]: {
		id: number;
	};
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
				name={communityNavigations.COMMUNITY_POSTING_DETAIL}
				component={CommunityPostingDetailScreen}
			/>
		</Stack.Navigator>
	);
}

export default CommunityStackNavigator;
