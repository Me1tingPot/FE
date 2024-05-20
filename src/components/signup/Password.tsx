import { Button, Text, View } from 'react-native';

const Password = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>비밀번호 입력</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Password;
