import React from 'react';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { authNavigations, colors, feedTabNavigations } from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignUpFinishScreen from '@/screens/auth/SignUpFinishScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import FeedStackNavigator from './FeedStackNavigator';

// Screen Typing시 아래 타입을 전달해주면 됨.
export type AuthStackParamList = {
	/**
	 * https://reactnavigation.org/docs/typescript/
	 *  Stack Param List라는 타입을 만들고, 스크린 명과 param에 대한 타이핑.
	 */
	[authNavigations.AUTH_HOME]: undefined;
	[authNavigations.LOGIN]: undefined;
	[authNavigations.SIGN_UP]: undefined;
	[authNavigations.SIGN_UP_FINISH]: undefined;
	[feedTabNavigations.FEED_HOME]: undefined;
};

function AuthStackNavigator() {
	const Stack = createStackNavigator<AuthStackParamList>();
	const { theme } = useThemeStore();

	const headerOptions: StackNavigationOptions = {
		headerStyle: {
			backgroundColor: colors[theme].WHITE,
		},
		headerTintColor: colors[theme].BLACK,
		headerShadowVisible: false,
		headerLeftLabelVisible: false,
		headerTitleAlign: 'center',
	};

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: colors[theme].WHITE,
				},
				headerTitleStyle: {
					fontSize: 15,
				},
				headerTintColor: colors[theme].BLACK,
			}}
		>
			<Stack.Screen
				name={authNavigations.AUTH_HOME}
				component={AuthHomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={authNavigations.LOGIN}
				component={LoginScreen}
				options={{
					headerTitle: '로그인',
					...headerOptions,
				}}
			/>
			<Stack.Screen
				name={authNavigations.SIGN_UP}
				component={SignUpScreen}
				options={{
					headerTitle: '회원가입',
					...headerOptions,
				}}
			/>
			<Stack.Screen
				name={authNavigations.SIGN_UP_FINISH}
				component={SignUpFinishScreen}
				options={{
					headerTitle: '회원가입 완료',
					...headerOptions,
					headerStyle: {
						backgroundColor: colors[theme].UNCHANGE_WHITE,
					},
					headerTintColor: colors[theme].UNCHANGE_BLACK,
				}}
			/>
			<Stack.Screen
				name={feedTabNavigations.FEED_HOME}
				component={FeedStackNavigator}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}

export default AuthStackNavigator;
