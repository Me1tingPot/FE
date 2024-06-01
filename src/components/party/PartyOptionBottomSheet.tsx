import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CheckBox from '../common/CheckBox';
import PartyOptionRegion from './PartyOptionRegion';

type Ref = BottomSheet;

interface IPartyOptionBottomSheet {
	handleClosePress: () => void;
}

const PartyOptionBottomSheet = forwardRef<Ref, IPartyOptionBottomSheet>(
	({ handleClosePress }, ref) => {
		const { theme } = useThemeStore();
		const styles = styling(theme);
		const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
		const [selectedItem, setSelectedItem] = useState<string | null>('지역');

		const renderBackdrop = useCallback(
			(props: any) => (
				<BottomSheetBackdrop
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					{...props}
				/>
			),
			[],
		);

		const handleItemPress = (item: string) => {
			setSelectedItem(item);
		};

		return (
			<BottomSheetModal
				ref={ref}
				index={2}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				enableContentPanningGesture={false}
				handleIndicatorStyle={{
					backgroundColor: colors[theme].GRAY_500,
				}}
				backgroundStyle={{
					backgroundColor: colors[theme].WHITE,
				}}
				backdropComponent={renderBackdrop}
			>
				<BottomSheetView style={styles.contentContainer}>
					<View style={styles.menuTopContainer}>
						{['지역'].map(item => (
							<Pressable
								key={item}
								style={({ pressed }) => [
									styles.selectButton,
									selectedItem === item && styles.selectedButton,
									pressed && { opacity: 0.5 },
								]}
								onPress={() => handleItemPress(item)}
							>
								<Text
									style={
										selectedItem === item
											? styles.selectButtonText
											: styles.buttonText
									}
								>
									{item}
								</Text>
							</Pressable>
						))}
					</View>
					{selectedItem === '지역' && (
						<PartyOptionRegion handleClosePress={handleClosePress} />
					)}
				</BottomSheetView>
			</BottomSheetModal>
		);
	},
);

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		contentContainer: {
			flex: 1,
		},
		menuTopContainer: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			gap: 20,
			marginLeft: 30,
		},
		selectButton: {
			paddingVertical: 8,
			paddingHorizontal: 10,
			borderBottomWidth: 2,
			borderBottomColor: 'transparent',
		},
		selectedButton: {
			color: colors[theme].RED_300,
			borderBottomColor: colors[theme].RED_500,
		},
		buttonText: {
			color: colors[theme].GRAY_700,
			fontSize: 15,
		},
		selectButtonText: {
			color: colors[theme].RED_300,
			fontSize: 17,
		},
	});

export default PartyOptionBottomSheet;
