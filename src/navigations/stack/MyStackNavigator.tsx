import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, myNavigations } from '@/constants';
import MyEditProfileScreen from '@/screens/my/MyEditProfileScreen';
import MyHomeScreen from '@/screens/my/MyHomeScreen';
import MyWritePostScreen from '@/screens/my/MyWritePostScreen';
import useThemeStore from '@/store/useThemeStore';

export type MyStackParamList = {
	[myNavigations.MY_HOME]: undefined;
	[myNavigations.EDIT_PROFILE]: undefined;
	[myNavigations.MY_WRITE_POST]: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

function MyStackNavigator() {
	const { t } = useTranslation();
	const { theme } = useThemeStore();

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
					fontSize: 15,
				},
				headerTintColor: colors[theme].BLACK,
			}}
		>
			<Stack.Screen
				name={myNavigations.MY_HOME}
				component={MyHomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={myNavigations.EDIT_PROFILE}
				component={MyEditProfileScreen}
				options={{
					headerTitle: `${t('프로필 수정')}`,
					cardStyle: {
						backgroundColor: colors[theme].WHITE,
					},
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
		</Stack.Navigator>
	);
}

export default MyStackNavigator;
