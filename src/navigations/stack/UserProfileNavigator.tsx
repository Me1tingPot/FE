import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import UserProfileRightHeader from '@/components/user/UserProfileRightHeader';
import { colors, userNavigations } from '@/constants';
import UserProfileImagesScreen from '@/screens/user/UserProfileImagesScreen';
import UserProfileScreen from '@/screens/user/UserProfileScreen';
import useThemeStore from '@/store/useThemeStore';
import MeltingUs from '../../assets/images/MeltingUs.png';

export type UserProfileStackParamList = {
	[userNavigations.USER_PROFILE]: { id: number };
	[userNavigations.USER_PROFILE_IMAGE]: undefined;
};

function UserProfileNavigator() {
	const Stack = createStackNavigator<UserProfileStackParamList>();
	const { t } = useTranslation();
	const { theme } = useThemeStore();

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
				name={userNavigations.USER_PROFILE}
				component={UserProfileScreen}
				options={{
					headerTitle: () => <Image source={MeltingUs} />,
					headerRight: () => <UserProfileRightHeader />,
					...commonHeaderOptions,
				}}
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
