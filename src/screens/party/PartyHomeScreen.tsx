import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Calendar from '@/components/calendar/Calendar';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getMonthYearDetails, getNewMonthYear } from '@/utils';

interface PartyHomeScreenProps {}

function PartyHomeScreen({}: PartyHomeScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const currentMonthYear = getMonthYearDetails(new Date());
	const [monthYear, setMonthYear] = useState(currentMonthYear);
	const [selectedDate, setSelectedDate] = useState(0);

	const handleUpdateMonth = (increment: number) => {
		setMonthYear(prev => getNewMonthYear(prev, increment));
	};

	const handlePressDate = (date: number) => {
		setSelectedDate(date);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text>PartyHomeScreen</Text>
			<Calendar
				monthYear={monthYear}
				onChangeMonth={handleUpdateMonth}
				selectedDate={selectedDate}
				onPressDate={handlePressDate}
			/>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
	});

export default PartyHomeScreen;
