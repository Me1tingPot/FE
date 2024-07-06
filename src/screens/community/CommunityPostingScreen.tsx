import { useCallback, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import PostingPreview from '@/components/community/PostingPreview';
import { colors, communityNavigations } from '@/constants';
import useCommunity from '@/hooks/queries/useCommunity';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { POST_DTO } from '@/types/api/types';

type CommunityPostingScreenProps = {
	navigation: NavigationProp<CommunityStackParamList>;
};

function CommunityPostingScreen({ navigation }: CommunityPostingScreenProps) {
	const [refreshing, setRefreshing] = useState(false);
	const { useGetInfinitePostingPostLists } = useCommunity();
	const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
		useGetInfinitePostingPostLists();

	const { theme } = useThemeStore();
	const styles = styling(theme);

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
		<PostingPreview
			key={item.postId}
			navigation={navigation}
			id={item.postId}
			post={item}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="light-content"
				backgroundColor={colors[theme].WHITE}
			/>
			<View style={styles.contentContainer}>
				<FlatList
					data={data?.pages}
					contentContainerStyle={styles.scrollStyle}
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
							inverted
						/>
					)}
				/>
			</View>
			<View style={styles.buttonList}>
				<IconCircleButton
					family="Octicons"
					name="pencil"
					color={colors[theme].WHITE}
					size={30}
					onPress={() =>
						navigation.navigate(communityNavigations.COMMUNITY_POSTING_WRITE)
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
			paddingHorizontal: 20,
			paddingVertical: 30,
		},
		scrollStyle: {
			display: 'flex',
			flexDirection: 'column',
			gap: 15,
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

export default CommunityPostingScreen;
