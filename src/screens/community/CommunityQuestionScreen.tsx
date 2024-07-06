import { useCallback, useState } from 'react';
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { POST_TYPE } from '@/api/community';
import IconCircleButton from '@/components/common/IconCircleButton';
import QuestionPreview from '@/components/community/QuestionPreview';
import { colors, communityNavigations } from '@/constants';
import useCommunity from '@/hooks/queries/useCommunity';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CommunityQuestionScreenProps {
	navigation: NavigationProp<CommunityStackParamList>;
}

function CommunityQuestionScreen({ navigation }: CommunityQuestionScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [refreshing, setRefreshing] = useState(false);
	const { useGetPosts } = useCommunity();
	const PostData = useGetPosts({
		postType: POST_TYPE.QUESTION,
		cursor: 1,
		pageSize: 10,
	});

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
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[colors[theme].BLACK]}
						tintColor={colors[theme].BLACK}
					/>
				}
			>
				{PostData.data?.data.pageDtos.map((post, index) => (
					<QuestionPreview
						key={index}
						navigation={navigation}
						id={index}
						post={post}
					/>
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
}

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
