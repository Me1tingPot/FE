import { useCallback, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import QuestionPreview from '@/components/community/QuestionPreview';
import { colors, communityNavigations } from '@/constants';
import useCommunity from '@/hooks/queries/useCommunity';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { POST_DTO } from '@/types/api/types';

interface CommunityQuestionScreenProps {
	navigation: NavigationProp<CommunityStackParamList>;
}

function CommunityQuestionScreen({ navigation }: CommunityQuestionScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [refreshing, setRefreshing] = useState(false);
	const { useGetInfiniteQuestionPostLists } = useCommunity();
	const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
		useGetInfiniteQuestionPostLists();

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().finally(() => {
			setRefreshing(false);
		});
	}, [refetch]);

	const loadMore = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const renderItem = ({ item }: { item: POST_DTO }) => (
		<QuestionPreview navigation={navigation} post={item} id={item.postId} />
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentContainer}>
				<FlatList
					data={data?.pages}
					contentContainerStyle={styles.contentContainer}
					renderItem={({ item }) => (
						<FlatList
							data={item.data.pageDtos}
							renderItem={renderItem}
							keyExtractor={item => `${item.postId}`}
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={onRefresh}
									colors={[colors[theme].BLACK]}
									tintColor={colors[theme].BLACK}
								/>
							}
							onEndReached={loadMore}
							onEndReachedThreshold={0.5}
							ListFooterComponent={
								isFetchingNextPage ? <ActivityIndicator size="small" /> : null
							}
							ItemSeparatorComponent={() => <View style={styles.gapStyle} />}
						/>
					)}
					keyExtractor={(item, index) => `${item.data.nextCursor}-${index}`}
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
			gap: 10,
			paddingHorizontal: 10,
			paddingVertical: 10,
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
