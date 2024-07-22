import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	FlatList,
	RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import CustomButton from '@/components/common/CustomButton';
import PartyBox from '@/components/party/PartyBox';
import PartyOptionBottomSheet, {
	IFilter,
} from '@/components/party/PartyOptionBottomSheet';
import { colors } from '@/constants';
import useParty from '@/hooks/queries/useParty';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PartyListScreenProps {
	navigation: NavigationProp<PartyStackParamList>;
}

function PartyListScreen({ navigation }: PartyListScreenProps) {
	const [refreshing, setRefreshing] = useState(false);
	const [filter, setFilter] = useState<IFilter>({
		region: null,
		duration: [],
		status: '',
	});
	const { useSearchPartyInfiniteLists } = useParty();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { theme } = useThemeStore();
	const styles = styling(theme);

	// TODO: 검색 결과 필터링 구현
	// 검색 결과를 위한 상태 설정
	// const [partyData, setPartyData] = useState({
	// 	query: '',
	// 	areaIdFilter: '',
	// 	temporalFilter: [],
	// 	statusFilter: '',
	// 	coordLeftTopFilter: null,
	// 	coordRightBottomFilter: null,
	// });

	const party = { query: '' };

	// if (partyData.areaIdFilter) {
	// 	party = {
	// 		query: 'aa',
	// 		areaIdFilter: partyData?.areaIdFilter,
	// 		temporalFilter: partyData?.temporalFilter,
	// 		statusFilter: partyData?.statusFilter,
	// 		coordLeftTopFilter: partyData?.coordLeftTopFilter,
	// 		coordRightBottomFilter: partyData?.coordRightBottomFilter,
	// 	};
	// }

	const {
		data: partyList,
		refetch,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		error,
	} = useSearchPartyInfiniteLists(party);

	// useEffect(() => {
	// 	refetch().finally(() => {
	// 		console.log('search');
	// 		console.log(error.response);
	// 	});
	// }, [partyData]);

	const handleClosePress = () => {
		// setPartyData({
		// 	query: '파티',
		// 	areaIdFilter: filter.region?.areaId,
		// 	temporalFilter: filter.duration,
		// 	statusFilter: filter.status,
		// 	coordLeftTopFilter: {
		// 		latitude: 0,
		// 		longitude: 0,
		// 	},
		// 	coordRightBottomFilter: {
		// 		latitude: 0,
		// 		longitude: 0,
		// 	},
		// });
		bottomSheetModalRef.current?.close();
	};

	const handleOpenPress = () => bottomSheetModalRef.current?.present();

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

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.contentContainer}>
					<CustomButton
						label="필터링"
						icon={
							<Ionicons name="filter" size={20} color={colors[theme].WHITE} />
						}
						onPress={handleOpenPress}
					/>

					<FlatList
						data={partyList?.pages}
						contentContainerStyle={styles.listContentContainer}
						renderItem={({ item, index }) => (
							<FlatList
								data={item.data.content}
								renderItem={({ item, index }) => (
									<PartyBox navigation={navigation} partyData={item} />
								)}
								onEndReached={loadMore}
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
										colors={[colors[theme].BLACK]}
										tintColor={colors[theme].BLACK}
									/>
								}
							/>
						)}
					/>
				</View>

				<PartyOptionBottomSheet
					ref={bottomSheetModalRef}
					handleClosePress={handleClosePress}
					filter={filter}
					setFilter={setFilter}
				/>
			</SafeAreaView>
		</BottomSheetModalProvider>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			marginBottom: 30,
			gap: 10,
		},
		listContentContainer: {
			paddingBottom: 20,
		},
		// filterLayout: {

		// }
	});

export default PartyListScreen;
