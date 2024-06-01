import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, districts } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

interface PartyOptionRegionProps {
	selectedRegion: string | null;
	setSelectedRegion: (item: string) => void;
	setSelectedSection: (section: string) => void;
}

const PartyOptionRegion = ({
	selectedRegion,
	setSelectedRegion,
	setSelectedSection,
}: PartyOptionRegionProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handlePress = (item: string) => {
		setSelectedItem(item);
	};

	const handleSelectRegion = (item: string) => {
		setSelectedRegion(item);
	};

	const renderRightContent = () => {
		if (!selectedItem) {
			return (
				<View>
					<Text>지역을 선택해 주세요.</Text>
				</View>
			);
		}

		const districtList = districts[selectedItem] || [];

		return (
			<View>
				{districtList.map((district, idx) => (
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
							{district}
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
					{[
						'서울',
						'경기',
						'인천',
						'강원',
						'대전/충청',
						'대구',
						'부산/울산',
						'경상',
						'광주/전라/제주',
					].map((item, idx) => (
						<Pressable
							key={idx}
							style={({ pressed }) => [
								styles.item,
								selectedItem === item && styles.selectedItem,
								pressed && { opacity: 0.5 },
							]}
							onPress={() => handlePress(item)}
						>
							<Text
								style={[
									styles.itemText,
									selectedItem === item && styles.selectedText,
								]}
							>
								{item}
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
};

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
