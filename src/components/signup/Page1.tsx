import { Button, Text, View } from 'react-native';

const Page1 = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>Page 1 </Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Page1;
