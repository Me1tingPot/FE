import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@react-navigation/native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CheckBox from '../common/CheckBox';
import CustomButton from '../common/CustomButton';

interface PartyOptionPeriodProps {
	selectedPeriod: string | null;
	setSelectedSection: (section: string) => void;
	setSelectedPeriod: (item: string) => void;
}

function PartyOptionPeriod({
	setSelectedPeriod,
	setSelectedSection,
	selectedPeriod,
}: PartyOptionPeriodProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handlePress = (item: string) => {
		setSelectedItem(item);
		setSelectedPeriod(item);
	};

	const handleNavigateToNextSection = () => {
		if (selectedItem) {
			setSelectedSection('모집 상태');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>기간</Text>
			</View>
			{['최근 일주일 내', '최근 한달 내', '최신 순', '오래된 순'].map(
				(item, idx) => (
					<CheckBox
						key={idx}
						size="l"
						isChecked={selectedPeriod === item}
						onChangeCheck={() => handlePress(item)}
					>
						<Text style={styles.checkboxText}>{item}</Text>
					</CheckBox>
				),
			)}
			<View style={styles.buttonContainer}>
				<CustomButton
					label="모집 상태 선택하기"
					variant="outlined"
					onPress={handleNavigateToNextSection}
					size="medium"
				/>
			</View>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			justifyContent: 'center',
			paddingHorizontal: 40,
			gap: 20,
		},
		header: {
			marginBottom: 10,
			paddingVertical: 10,
			borderRadius: 5,
		},
		headerText: {
			color: colors[theme].GRAY_700,
			fontSize: 16,
			fontWeight: 'bold',
		},
		checkboxText: {
			fontSize: 16,
			color: colors[theme].GRAY_700,
			marginLeft: 5,
		},
		buttonContainer: {
			marginTop: 20,
		},
	});

export default PartyOptionPeriod;
