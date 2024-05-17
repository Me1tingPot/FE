import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';

interface CommunityHomeScreenProps {}

function CommunityHomeScreen({}: CommunityHomeScreenProps) {
	const { theme } = useThemeStore();
	return (
		<SafeAreaView style={styles.container}>
			<Text>CommunityHomeScreen</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default CommunityHomeScreen;
