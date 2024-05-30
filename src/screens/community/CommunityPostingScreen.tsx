import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityPostingScreenProps = {};

const CommunityPostingScreen = ({}: CommunityPostingScreenProps) => {
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
			backgroundColor: colors[theme].WHITE,
		},
	});

export default CommunityPostingScreen;
