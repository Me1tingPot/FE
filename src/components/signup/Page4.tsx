import { Button, Text, View } from 'react-native';

const Page4 = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>Page4</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Page4;
