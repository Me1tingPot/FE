import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CommunityQuestionScreenProps {}

const CommunityQuestionScreen = ({}: CommunityQuestionScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<SafeAreaView style={styles.container}>
			<Text>CommunityPostingScreen</Text>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
	});

export default CommunityQuestionScreen;
