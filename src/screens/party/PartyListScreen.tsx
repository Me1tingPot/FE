import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import PartyCard from '@/components/common/PartyCard';
import PartyOptionBottomSheet, {
	IFilter,
} from '@/components/party/PartyOptionBottomSheet';
import useParty from '@/hooks/queries/useParty';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';

interface PartyListScreenProps {
	navigation: NavigationProp<PartyStackParamList>;
}

function PartyListScreen({ navigation }: PartyListScreenProps) {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState<IFilter>({
		region: '',
		duration: '',
		status: '',
	});
	const { useSearchPartyInfiniteLIsts } = useParty();

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handleClosePress = () => bottomSheetModalRef.current?.close();
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	const handlePressSearch = () => {
		console.log('search');
	};

	// TODO: 검색 결과 필터링 구현
	// useEffect(() => {
	// 	(async () => {
	// 		const partyData = {};
	// 		const { data } = useSearchPartyInfiniteLIsts({});
	// 	})();
	// }, []);

	return (
		<BottomSheetModalProvider>
			{/* 파티 리스트 개발 */}
			<Text>PartyListScreen</Text>
			<TouchableOpacity onPress={handleOpenPress}>
				<Text>이거 누르면 창 열림</Text>
			</TouchableOpacity>
			<PartyCard post={posts} />

			<PartyOptionBottomSheet
				ref={bottomSheetModalRef}
				handleClosePress={handleClosePress}
				filter={filter}
				setFilter={setFilter}
			/>
		</BottomSheetModalProvider>
	);
}

export default PartyListScreen;
