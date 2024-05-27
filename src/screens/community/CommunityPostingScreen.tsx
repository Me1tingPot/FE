import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { feedTabNavigations } from '@/constants';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
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
			<Text>Hi</Text>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
	});

export default CommunityPostingScreen;
