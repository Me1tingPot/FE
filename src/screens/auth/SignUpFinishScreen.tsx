import { Button, Text, View } from 'react-native';
import { authNavigations } from '@/constants';
import { AuthHomeScreenProps } from './AuthHomeScreen';

const SignUpFinishScreen = ({ navigation }: AuthHomeScreenProps) => {
	return (
		<View>
			<Text>회원가입 완료</Text>
			<Button
				title="로그인 하러가기!!"
				onPress={() => navigation.replace(authNavigations.LOGIN)}
			/>
		</View>
	);
};

export default SignUpFinishScreen;
