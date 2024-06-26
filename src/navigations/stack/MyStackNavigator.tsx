import { useTranslation } from 'react-i18next';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { colors, myNavigations } from '@/constants';
import MyEditProfileScreen from '@/screens/my/MyEditProfileScreen';
import MyHomeScreen from '@/screens/my/MyHomeScreen';
import MyProfileImageEditScreen from '@/screens/my/MyProfileImageEditScreen';
import MyWritePostScreen from '@/screens/my/MyWritePostScreen';
import useThemeStore from '@/store/useThemeStore';

export type MyStackParamList = {
	[myNavigations.MY_PAGE_HOME]: undefined;
	[myNavigations.EDIT_PROFILE]: undefined;
	[myNavigations.MY_WRITE_POST]: undefined;
	[myNavigations.MY_PROFILE_IMAGE_EDIT]: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

function MyStackNavigator() {
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
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: colors[theme].WHITE,
				},
				headerStyle: {
					shadowColor: colors[theme].GRAY_200,
					backgroundColor: colors[theme].WHITE,
				},
				headerTitleStyle: {
					fontSize: 20,
				},
				headerTintColor: colors[theme].GRAY_700,
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen
				name={myNavigations.MY_PAGE_HOME}
				component={MyHomeScreen}
				options={{
					headerShown: true,
					headerTitle: `${t('마이페이지')}`,
				}}
			/>
			<Stack.Screen
				name={myNavigations.EDIT_PROFILE}
				component={MyEditProfileScreen}
				options={{
					headerTitle: `${t('프로필 수정')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={myNavigations.MY_WRITE_POST}
				component={MyWritePostScreen}
				options={{
					headerTitle: `${t('내가 쓴 글')}`,
					cardStyle: {
						backgroundColor: colors[theme].WHITE,
					},
				}}
			/>
			<Stack.Screen
				name={myNavigations.MY_PROFILE_IMAGE_EDIT}
				component={MyProfileImageEditScreen}
				options={{ headerTitle: `${t('프로필 사진')}`, ...commonHeaderOptions }}
			/>
		</Stack.Navigator>
	);
}

export default MyStackNavigator;
