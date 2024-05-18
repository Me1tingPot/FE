import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Config from 'react-native-config';
import CustomButton from '@/components/common/CustomButton';
import i18n from '@/locales/i18n.config';

console.log('환경변수 테스트', Config.TEST);

interface FeedHomeScreenProps {}

function FeedHomeScreen({}: FeedHomeScreenProps) {
	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text>FeedHomeScreen</Text>
			<Button title="한국어" onPress={() => changeLanguage('ko')} />
			<Button title="영어" onPress={() => changeLanguage('en')} />
			<View style={styles.buttonContainer}>
				<CustomButton
					label="버튼 테스트"
					size="medium"
					variant={'outlined'}
					isLoading={true}
				/>
				<CustomButton
					label="버튼 테스트"
					size="medium"
					onPress={() => console.log('click')}
					inValid={false}
					isLoading={true}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonContainer: {
		padding: 20,
		gap: 20,
	},
});

export default FeedHomeScreen;
