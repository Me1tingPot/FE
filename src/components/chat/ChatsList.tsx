import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useGetInfiniteChats from '@/hooks/queries/useGetInfiniteChats';
import { useStomp } from '@/hooks/useStomp';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import PartyCard from '../common/PartyCard';

function ChatsList() {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const {
		data: chats,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useGetInfiniteChats();

	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
	};

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	return (
		<FlatList
			data={chats?.pages.flat()}
			renderItem={({ item }) => {
				return <PartyCard post={item.data.chatRoomGetResponseList} />;
			}}
			keyExtractor={item => String(item.id)}
			numColumns={2}
			contentContainerStyle={styles.contentContainer}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			refreshing={isRefreshing}
			onRefresh={handleRefresh}
			scrollIndicatorInsets={{ right: 1 }}
			indicatorStyle={theme === 'dark' ? 'white' : 'black'}
		/>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		contentContainer: {
			flex: 1,
			flexDirection: 'column',
		},
		headerContainer: {
			gap: 5,
			backgroundColor: colors[theme].WHITE,
			paddingHorizontal: 5,
			paddingTop: 5,
			paddingBottom: 10,
		},
		drawerIconContainer: {
			justifyContent: 'center',
			paddingHorizontal: 8,
			borderWidth: 1,
			borderColor: colors[theme].GRAY_200,
			borderRadius: 5,
		},
		inputContainer: {
			flex: 1,
		},
	});

export default ChatsList;
