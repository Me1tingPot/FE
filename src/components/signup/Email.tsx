import { Button, Text, View } from 'react-native';

const Email = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>Email</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Email;
