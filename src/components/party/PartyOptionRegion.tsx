import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useArea from '@/hooks/queries/useArea';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { AREA_DATA } from '@/types/api/types';
import CustomButton from '../common/CustomButton';

interface PartyOptionRegionProps {
	selectedRegion: AREA_DATA | null;
	setSelectedRegion: (item: AREA_DATA) => void;
	setSelectedSection: (section: string) => void;
}

function PartyOptionRegion({
	selectedRegion,
	setSelectedRegion,
	setSelectedSection,
}: PartyOptionRegionProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [selectedItem, setSelectedItem] = useState<AREA_DATA>({
		areaId: '',
		areaName: '',
	});
	const [region, setRegion] = useState<AREA_DATA[] | undefined>();
	const [districtList, setDistrictList] = useState<AREA_DATA[] | undefined>();
	const { t } = useTranslation();
	const { useSearchArea, useGetChildArea } = useArea();

	const { data: allArea } = useSearchArea();
	const { data: childArea } = useGetChildArea(selectedItem?.areaId);

	useEffect(() => {
		setRegion(allArea?.data);
	}, [allArea]);

	useEffect(() => {
		setDistrictList(childArea?.data);
	}, [selectedItem]);

	const handlePress = (item: AREA_DATA) => {
		setSelectedItem(item);
	};

	const handleSelectRegion = (item: AREA_DATA) => {
		setSelectedRegion(item);
	};

	const renderRightContent = () => {
		if (!selectedItem) {
			return (
				<View style={styles.rightContainer}>
					<Text style={styles.districtText}>{t('지역을 선택해 주세요.')}</Text>
				</View>
			);
		}

		return (
			<View>
				{districtList?.map((district: AREA_DATA, idx: number) => (
					<Pressable
						key={idx}
						onPress={() => handleSelectRegion(district)}
						style={({ pressed }) => [
							styles.districtItem,
							pressed && (styles.pressedDistrictItem as any),
						]}
					>
						<Text
							style={[
								styles.districtText,
								selectedRegion === district && styles.selectedText,
							]}
						>
							{district.areaName}
						</Text>
					</Pressable>
				))}
			</View>
		);
	};

	const handleNavigateToNextSection = () => {
		if (selectedItem) {
			setSelectedSection('기간');
		}
	};

	return (
		<>
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.leftContainer}>
					{region?.map((area: AREA_DATA, idx: number) => (
						<Pressable
							key={idx}
							style={({ pressed }) => [
								styles.item,
								selectedItem === area && styles.selectedItem,
								pressed && { opacity: 0.5 },
							]}
							onPress={() => handlePress(area)}
						>
							<Text
								style={[
									styles.itemText,
									selectedItem === area && styles.selectedText,
								]}
							>
								{area.areaName}
							</Text>
						</Pressable>
					))}
				</ScrollView>
				<View style={styles.rightContainer}>
					<ScrollView>{renderRightContent()}</ScrollView>
				</View>
			</View>
			<View style={{ padding: 20 }}>
				<CustomButton
					label="기간 선택하기" // Changed label
					variant="outlined"
					onPress={handleNavigateToNextSection} // Changed onPress
					size="medium"
					disabled={!selectedItem} // Disable button if no region is selected
				/>
			</View>
		</>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			flex: 1,
		},
		leftContainer: {
			flex: 3,
			padding: 10,
		},
		rightContainer: {
			flex: 7,
			padding: 10,
			flexDirection: 'column',
			justifyContent: 'center',
		},
		item: {
			paddingVertical: 15,
			borderBottomWidth: 1,
			borderColor: colors[theme].GRAY_300,
		},
		selectedItem: {
			backgroundColor: colors[theme].WHITE,
		},
		itemText: {
			fontSize: 16,
			color: colors[theme].GRAY_500,
			fontFamily: 'Pretendard-Bold',
		},
		selectedText: {
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Bold',
		},
		districtItem: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			marginBottom: 5,
			borderRadius: 8,
		},
		districtText: {
			fontSize: 16,
			color: colors[theme].GRAY_500,
			fontFamily: 'Pretendard-Bold',
		},
		pressedDistrictItem: {
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Bold',
		},
	});

export default PartyOptionRegion;
