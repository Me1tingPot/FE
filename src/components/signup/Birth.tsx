import { Button, Text, View } from 'react-native';

const Birth = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>생년월일 입력</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Birth;
