import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { authNavigations } from '@/constants';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';

/** *
 * Screen Typing
 * Navigator에서 정의한 ParamList를 타입으로 전달, 조금 더 명확히 하기 위해서 스크린 명까지 전달.
 */
export type AuthHomeScreenProps = StackScreenProps<
	AuthStackParamList,
	typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
	return (
		<SafeAreaView>
			<Button
				title="로그인 화면으로 이동"
				onPress={() => navigation.navigate(authNavigations.LOGIN)}
			/>
			<Button
				title="회원가입 화면으로 이동"
				onPress={() => navigation.navigate(authNavigations.SIGN_UP)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
