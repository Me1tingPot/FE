import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import PartyOptionBottomSheet, {
	IFilter,
} from '@/components/party/PartyOptionBottomSheet';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';

interface PartyListScreenProps {
	navigation: NavigationProp<PartyStackParamList>;
}

function PartyListScreen({ navigation }: PartyListScreenProps) {
	const [filter, setFilter] = useState<IFilter>({
		region: '',
		duration: '',
		status: '',
	});

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handleClosePress = () => bottomSheetModalRef.current?.close();
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	const handlePressSearch = () => {
		navigation.navigate('PartySearch');
	};

	return (
		<BottomSheetModalProvider>
			{/* 파티 리스트 개발 */}
			<Text>PartyListScreen</Text>
			<TouchableOpacity onPress={handleOpenPress}>
				<Text>이거 누르면 창 열림</Text>
			</TouchableOpacity>

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
