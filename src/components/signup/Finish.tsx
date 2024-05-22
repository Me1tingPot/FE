import { Button, Text, View } from 'react-native';

const Finish = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>회원가입 완료</Text>
			<Button title="회원가입 끝내기!!" onPress={onNext} />
		</View>
	);
};

export default Finish;
