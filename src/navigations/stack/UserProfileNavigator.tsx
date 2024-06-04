import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import { userNavigations } from '@/constants';
import UserProfileImagesScreen from '@/screens/user/UserProfileImagesScreen';
import UserProfileScreen from '@/screens/user/UserProfileScreen';
import useThemeStore from '@/store/useThemeStore';

export type UserProfileStackParamList = {
	[userNavigations.USER_PROFILE]: { id: number };
	[userNavigations.USER_PROFILE_IMAGE]: undefined;
};

function UserProfileNavigator() {
	const Stack = createStackNavigator<UserProfileStackParamList>();
	const { t } = useTranslation();
	const { theme } = useThemeStore();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={userNavigations.USER_PROFILE}
				component={UserProfileScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={userNavigations.USER_PROFILE_IMAGE}
				component={UserProfileImagesScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default UserProfileNavigator;
