import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const PartyHomeScreen = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<Text>123</Text>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors[theme].WHITE,
			flex: 1,
		},
	});

export default PartyHomeScreen;
