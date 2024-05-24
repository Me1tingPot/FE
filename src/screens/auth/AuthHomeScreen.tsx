import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CompoundOption } from '@/components/common/CompoundOption';
import Babo from '@/components/signup/Babo';
import { authNavigations } from '@/constants';
import useModal from '@/hooks/useModal';
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
	const modal = useModal();
	const [userData, setUserData] = useState<{
		id: string;
		firstName: string;
		lastName: string;
	} | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('https://localhost:8081/user');
				const data = await response.json();
				console.log('반환값: ', data);
				setUserData(data);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};
		fetchUserData();
	}, []);

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
			<Button title="컴파운드 옵션열기" onPress={modal.show} />

			<Text>{userData?.firstName}</Text>
			<Babo isVisible={modal.isVisible} hideOption={modal.hide} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
