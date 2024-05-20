import { Button, Text, View } from 'react-native';

const FaceImg = ({ onNext }: { onNext: () => void }) => {
	return (
		<View>
			<Text>얼굴 이미지 업로드</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default FaceImg;
