import { Button, Text, View } from 'react-native';

const Page2 = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>Page2</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Page2;
