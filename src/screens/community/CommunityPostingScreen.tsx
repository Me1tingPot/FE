import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import PostPreview from '@/components/community/PostPreview';
import { colors } from '@/constants';
import { CommunityTabParamList } from '@/navigations/topTab/CommunityTopTabNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityPostingScreenProps = {
	navigation: NavigationProp<CommunityTabParamList>;
};

const CommunityPostingScreen = ({
	navigation,
}: CommunityPostingScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				{new Array(10).fill(null).map(() => (
					<PostPreview />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			paddingHorizontal: 20,
			paddingVertical: 20,
		},
	});

export default CommunityPostingScreen;
