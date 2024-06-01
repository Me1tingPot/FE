import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
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

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<View style={styles.buttonContainer}>
					<Button title="Open" onPress={handleOpenPress} />
					<Button title="Close" onPress={handleClosePress} />
				</View>
				<PartyOptionBottomSheet
					ref={bottomSheetModalRef}
					handleClosePress={handleClosePress}
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
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginVertical: 20,
		},
	});

export default PartyHomeScreen;
