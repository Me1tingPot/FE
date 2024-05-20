import { Button, Text, View } from 'react-native';

const Name = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>이름 작성</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Name;
