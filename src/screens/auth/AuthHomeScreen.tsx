import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { CompoundOption } from '@/components/common/CompoundOption';
import DatePickerOption from '@/components/signup/DatePickerOption';
import { authNavigations } from '@/constants';
import useModal from '@/hooks/useModal';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';

/** *
 * Screen Typing
 * Navigator에서 정의한 ParamList를 타입으로 전달, 조금 더 명확히 하기 위해서 스크린 명까지 전달.
 */
export type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
	const modal = useModal();
	const [userData, setUserData] = useState<{
		id: string;
		firstName: string;
		lastName: string;
	} | null>(null);
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('https://localhost:8081/user');
				const data = await response.json();

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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
