import { SafeAreaView, StyleSheet, Text } from 'react-native';

interface CommunityHomeScreenProps {}

function CommunityHomeScreen({}: CommunityHomeScreenProps) {
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
