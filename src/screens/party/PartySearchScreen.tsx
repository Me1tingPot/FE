import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import SearchRegionResult from './SearchRegionResult';

interface partySearchScreenProps {}

const partySearchScreen = ({}: partySearchScreenProps) => {
	const [keyword, setKeyword] = useState<string>('');
	const { userLocation } = useUserLocation();
	const { regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage } =
		useSearchLocation(keyword, userLocation);

	const handleChangeKeyword = (text: string) => {
		setKeyword(text);
	};
	return (
		<View style={styles.container}>
			<SearchInput
				autoFocus
				value={keyword}
				onChangeText={handleChangeKeyword}
				placeholder="검색할 장소를 입력하세요!"
				onSubmit={() => Keyboard.dismiss()}
			/>
			<SearchRegionResult regionInfo={regionInfo} />
			<Pagination
				pageParam={pageParam}
				fetchNextPage={fetchNextPage}
				fetchPrevPage={fetchPrevPage}
				hasNextPage={hasNextPage}
				totalLength={regionInfo.length}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});

export default partySearchScreen;
