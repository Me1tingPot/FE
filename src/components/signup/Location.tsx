import { Button, Text, View } from 'react-native';

const Location = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>위치 입력</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Location;
