import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
	FlatList,
} from 'react-native';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import PartyCard from '@/components/common/PartyCard';
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
	// const partyData = {
	// 	query: '파티',
	// 	areaIdFilter: filter.region?.areaId,
	// 	temporalFilter: filter.duration,
	// 	statusFilter: filter.status,
	// };
	// const { data, error } = useSearchPartyInfiniteLists(partyData);
	// console.log('받은 데이터: ', data);
	// console.error('에러: ', error?.response);

	const {
		data: partyList,
		refetch,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useSearchPartyInfiniteLists({ query: '' });

	const handleClosePress = () => {
		bottomSheetModalRef.current?.close();
	};
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	const handlePressSearch = () => {
		console.log('search');
	};

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
					{/* 파티 리스트 개발 */}
					<Text>PartyListScreen</Text>
					<TouchableOpacity onPress={handleOpenPress}>
						<Text>이거 누르면 창 열림</Text>
					</TouchableOpacity>

					<FlatList
						data={partyList?.pages}
						renderItem={({ item, index }) => (
							<FlatList
								data={item.data.content}
								renderItem={({ item, index }) => (
									<PartyBox navigation={navigation} partyData={item} />
								)}
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
		},
		partyListLayout: {},
	});

export default PartyListScreen;
