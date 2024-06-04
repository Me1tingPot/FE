import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

function UserProfileScreen() {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Text>테스트</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			gap: 10,
			padding: 20,
		},
		headerContainer: {
			gap: 10,
			padding: 10,
		},
	});

export default UserProfileScreen;
