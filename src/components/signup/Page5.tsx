import { Button, Text, View } from 'react-native';

const Page5 = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>Page5</Text>
			<Button title="회원가입 끝내기!!" onPress={onNext} />
		</View>
	);
};

export default Page5;
