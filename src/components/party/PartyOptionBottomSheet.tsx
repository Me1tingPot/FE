import React, {
	Dispatch,
	SetStateAction,
	forwardRef,
	useCallback,
	useMemo,
	useState,
} from 'react';
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
import PartyOptionPeriod from './PartyOptionPeriod';
import PartyOptionRegion from './PartyOptionRegion';
import PartyOptionStatus from './PartyOptionStatus';

type Ref = BottomSheet;

export interface IFilter {
	region: string;
	duration: string;
	status: string;
}

interface IPartyOptionBottomSheet {
	handleClosePress: () => void;
	setFilter: Dispatch<SetStateAction<IFilter>>;
	filter: IFilter;
}

const PartyOptionBottomSheet = forwardRef<Ref, IPartyOptionBottomSheet>(
	({ handleClosePress, setFilter, filter }, ref: any) => {
		const { theme } = useThemeStore();
		const styles = styling(theme);
		const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);
		const [selectedItem, setSelectedItem] = useState<string | null>('지역');
		console.log(filter);

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
						{['지역', '기간', '모집 상태'].map(item => (
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
						<PartyOptionRegion
							selectedRegion={filter.region}
							setSelectedRegion={region =>
								setFilter(prev => ({ ...prev, region }))
							}
							setSelectedSection={setSelectedItem}
						/>
					)}
					{selectedItem === '기간' && (
						<PartyOptionPeriod
							selectedPeriod={filter.duration}
							setSelectedPeriod={duration =>
								setFilter(prev => ({ ...prev, duration }))
							}
							setSelectedSection={setSelectedItem}
						/>
					)}
					{selectedItem === '모집 상태' && (
						<PartyOptionStatus
							selectedStatus={filter.status}
							setSelectedStatus={status =>
								setFilter(prev => ({ ...prev, status }))
							}
							handleCloseModal={handleClosePress}
						/>
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
