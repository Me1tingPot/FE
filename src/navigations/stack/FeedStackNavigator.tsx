import { createStackNavigator } from '@react-navigation/stack';
import { feedNavigations } from '@/constants';
import AlertHomeScreen from '@/screens/alert/AlertHomeScreen';
import FeedTabNavigator from '../tab/FeedTabNavigator';

export type FeedStackParamList = {
	[feedNavigations.ALERT]: undefined;
	[feedNavigations.FEED_TAB]: undefined;
};

function FeedStackNavigator() {
	const Stack = createStackNavigator<FeedStackParamList>();

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
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default FeedStackNavigator;
