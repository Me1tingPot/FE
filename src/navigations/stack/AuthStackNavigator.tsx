import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { authNavigations, colors } from '@/constants';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignUpFinishScreen from '@/screens/auth/SignUpFinishScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';

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
};

function AuthStackNavigator() {
	const Stack = createStackNavigator<AuthStackParamList>();
	const { theme } = useThemeStore();
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
				}}
			/>
			<Stack.Screen
				name={authNavigations.SIGN_UP}
				component={SignUpScreen}
				options={{
					headerTitle: '회원가입',
				}}
			/>
			<Stack.Screen
				name={authNavigations.SIGN_UP_FINISH}
				component={SignUpFinishScreen}
				options={{
					headerTitle: '회원가입 완료',
				}}
			/>
		</Stack.Navigator>
	);
}

export default AuthStackNavigator;
