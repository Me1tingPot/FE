import { useCallback, useState } from 'react';
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import PostPreview from '@/components/community/PostPreview';
import { colors, communityNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CommunityQuestionScreenProps {
	navigation: NavigationProp<CommunityStackParamList>;
}

const CommunityQuestionScreen = ({
	navigation,
}: CommunityQuestionScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{new Array(10).fill(null).map((item, index) => (
					<PostPreview key={index} navigation={navigation} id={index} />
				))}
			</ScrollView>
			<View style={styles.buttonList}>
				<IconCircleButton
					family="Octicons"
					name="pencil"
					color={colors[theme].WHITE}
					size={30}
					onPress={() =>
						navigation.navigate(communityNavigations.COMMUNITY_QUESTION_WRITE)
					}
				/>
			</View>
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
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
	});
export default CommunityQuestionScreen;
