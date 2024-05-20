import { Button, Text, View } from 'react-native';

const Language = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>언어 및 국적 입력</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Language;
