import React, { useRef, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	ScrollView,
	Pressable,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import PartyCard from '@/components/common/PartyCard';
import PartyOptionBottomSheet from '@/components/party/PartyOptionBottomSheet';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const PartyHomeScreen = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handleClosePress = () => bottomSheetModalRef.current?.close();
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	// 필터 상태를 객체로 관리
	const [filter, setFilter] = useState({
		region: '',
		duration: '',
		status: '',
	});

	console.log(filter);

	const handleFilterChange = (newFilter: typeof filter) => {
		setFilter(newFilter);
	};

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<Pressable onPress={handleOpenPress} style={styles.buttonContainer}>
					<Text style={styles.filterText}>필터</Text>
					<Ionicons name="options" size={23} color={colors[theme].RED_500} />
				</Pressable>
				<View>
					<Text style={{ color: colors[theme].GRAY_700 }}>{filter.region}</Text>
					<Text style={{ color: colors[theme].GRAY_700 }}>
						{filter.duration}
					</Text>
					<Text style={{ color: colors[theme].GRAY_700 }}>{filter.status}</Text>
				</View>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<PartyCard />
				</ScrollView>

				<PartyOptionBottomSheet
					ref={bottomSheetModalRef}
					handleClosePress={handleClosePress}
					filter={filter}
					setFilter={handleFilterChange}
				/>
			</SafeAreaView>
		</BottomSheetModalProvider>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors[theme].WHITE,
			flex: 1,
			paddingHorizontal: 30,
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center',
			paddingHorizontal: 20,
			gap: 10,
		},
		filterText: {
			fontSize: 15,
			color: colors[theme].RED_500,
		},
		scrollContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			paddingHorizontal: 20,
			paddingVertical: 20,
		},
	});

export default PartyHomeScreen;
