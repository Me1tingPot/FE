import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface DateBoxProps {
	date: number;
	selectedDate: number;
	onPressDate: (date: number) => void;
	isToday: boolean;
}

const deviceWidth = Dimensions.get('window').width;

const DateBox = ({
	date,
	selectedDate,
	onPressDate,
	isToday,
}: DateBoxProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable style={styles.container} onPress={() => onPressDate(date)}>
			{date > 0 && (
				<>
					<View
						style={[
							styles.dateContainer,
							selectedDate === date && styles.selectedContainer,
							selectedDate === date && isToday && styles.selectedTodayContainer,
						]}
					>
						<Text
							style={[
								styles.dateText,
								isToday && styles.todayText,
								selectedDate === date && styles.selectedDateText,
							]}
						>
							{date}
						</Text>
					</View>
				</>
			)}
		</Pressable>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			width: deviceWidth / 7,
			height: deviceWidth / 7,
			borderTopWidth: StyleSheet.hairlineWidth,
			borderTopColor: colors[theme].GRAY_200,
			alignItems: 'center',
		},
		dateContainer: {
			marginTop: 5,
			alignItems: 'center',
			justifyContent: 'center',
			width: 28,
			height: 28,
			borderRadius: 28,
			// Android borderRadius Problem resolve
			overflow: 'hidden',
		},
		selectedContainer: {
			backgroundColor: colors[theme].BLACK,
		},
		selectedTodayContainer: {
			backgroundColor: colors[theme].PINK_700,
		},
		dateText: {
			fontSize: 17,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
		},
		todayText: {
			color: colors[theme].PINK_700,
			fontWeight: 'bold',
			fontFamily: 'Pretendard-Bold',
		},
		selectedDateText: {
			color: colors[theme].WHITE,
			fontWeight: 'bold',
			fontFamily: 'Pretendard-Bold',
		},
	});

export default DateBox;
