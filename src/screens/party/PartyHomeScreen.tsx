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
import PartyOptionBottomSheet, {
	IFilter,
} from '@/components/party/PartyOptionBottomSheet';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const PartyHomeScreen = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handleClosePress = () => bottomSheetModalRef.current?.close();
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	const [filter, setFilter] = useState<IFilter>({
		region: '',
		duration: '',
		status: '',
	});

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<Pressable onPress={handleOpenPress} style={styles.buttonContainer}>
					<Text style={styles.filterText}>필터</Text>
					<Ionicons name="options" size={23} color={colors[theme].RED_500} />
				</Pressable>
				<View style={styles.selectedContainer}>
					<View style={styles.selectedButton}>
						<Text style={styles.selectedText}>{filter.region}</Text>
					</View>
					<View style={styles.selectedButton}>
						<Text style={styles.selectedText}>{filter.duration}</Text>
					</View>
					<View style={styles.selectedButton}>
						<Text style={styles.selectedText}>{filter.status}</Text>
					</View>
				</View>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<PartyCard />
				</ScrollView>

				<PartyOptionBottomSheet
					ref={bottomSheetModalRef}
					handleClosePress={handleClosePress}
					filter={filter}
					setFilter={setFilter}
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
		selectedContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginTop: 30,
		},
		selectedText: {
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-bold',
		},
		selectedButton: {
			borderColor: colors[theme].GRAY_700,
		},
	});

export default PartyHomeScreen;
