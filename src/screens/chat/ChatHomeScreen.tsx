import { SafeAreaView, StyleSheet } from 'react-native';
import ChatsList from '@/components/chat/ChatsList';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

function ChatHomeScreen() {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<ChatsList />
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
	});

export default ChatHomeScreen;
