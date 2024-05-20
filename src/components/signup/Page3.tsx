import { Button, Text, View } from 'react-native';

const Page3 = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>Page3</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Page3;
