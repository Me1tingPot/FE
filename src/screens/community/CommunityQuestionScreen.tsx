import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import QuestionPreview from '@/components/community/QuestionPreview';
import CommunityQuestionSkeletonScreen from '@/components/community/skeleton/CommunityQuestionSkeletonScreen';
import { colors, communityNavigations } from '@/constants';
import useCommunity from '@/hooks/queries/useCommunity';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import usePostStore from '@/store/usePostStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { POST_DTO } from '@/types/api/types';

interface CommunityQuestionScreenProps {
	navigation: NavigationProp<CommunityStackParamList>;
}

function CommunityQuestionScreen({ navigation }: CommunityQuestionScreenProps) {
	const { theme } = useThemeStore();
	const { t } = useTranslation();
	const styles = styling(theme);
	const [refreshing, setRefreshing] = useState(false);
	const { useGetInfiniteQuestionPostLists } = useCommunity();
	const {
		data,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		refetch,
		isPending,
	} = useGetInfiniteQuestionPostLists();
	const { setPost } = usePostStore();

	useFocusEffect(
		useCallback(() => {
			setPost(null);
		}, [setPost]),
	);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

	const loadMore = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const renderItem = ({ item }: { item: POST_DTO }) => (
		<QuestionPreview navigation={navigation} post={item} id={item.postId} />
	);

	if (isPending) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.contentContainer}>
					<FlatList
						scrollEnabled={false}
						data={Array(5).fill(null)}
						renderItem={() => <CommunityQuestionSkeletonScreen />}
						ItemSeparatorComponent={() => <View style={styles.gapStyle} />}
					/>
				</View>
			</SafeAreaView>
		);
	}

	if (data?.pages[0] && data?.pages[0].data.postsList.length <= 0) {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.blankContainer}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<Text
						style={styles.blankText}
					>{`${t('아직 작성된 글이 없습니다.')}`}</Text>
					<TouchableOpacity
						style={styles.writeButton}
						activeOpacity={0.8}
						onPress={() =>
							navigation.navigate(communityNavigations.COMMUNITY_QUESTION_WRITE)
						}
					>
						<Text style={styles.blankText}>{`${t('질문글 작성하기')}`}</Text>
					</TouchableOpacity>
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

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentContainer}>
				<FlatList
					data={data?.pages.flatMap(page => page.data.postsList)}
					renderItem={renderItem}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={
						isFetchingNextPage ? <ActivityIndicator size="small" /> : null
					}
					ItemSeparatorComponent={() => <View style={styles.gapStyle} />}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			</View>
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
			flex: 1,
			gap: 10,
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
		blankContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			gap: 20,
		},
		blankText: {
			color: colors.dark.GRAY_300,
			fontSize: 16,
		},
		writeButton: {
			borderRadius: 10,
			backgroundColor: colors.dark.GRAY_700,
			padding: 20,
		},
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
		gapStyle: {
			height: 10,
		},
	});
export default CommunityQuestionScreen;
