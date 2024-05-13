import React from 'react';
import { StyleSheet } from 'react-native';
import { authNavigations, colors } from '@/constants';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';

// Screen Typing시 아래 타입을 전달해주면 됨.
export type AuthStackParamList = {
	/**
	 * https://reactnavigation.org/docs/typescript/
	 *  Stack Param List라는 타입을 만들고, 스크린 명과 param에 대한 타이핑.
	 */
	[authNavigations.AUTH_HOME]: undefined;
	[authNavigations.LOGIN]: undefined;
	[authNavigations.SIGN_UP]: undefined;
};

function AuthStackNavigator() {
	const Stack = createStackNavigator<AuthStackParamList>();
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: colors.WHITE,
				},
				headerTitleStyle: {
					fontSize: 15,
				},
				headerTintColor: colors.BLACK,
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
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
