import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const DayOfWeeks = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const days = t('요일', { returnObjects: true });

	return (
		<View style={styles.container}>
			{days.map((dayOfWeek, i) => {
				return (
					<View key={i} style={styles.dayText}>
						<Text
							style={[
								styles.text,
								dayOfWeek === '토' && styles.saturdayText,
								dayOfWeek === 'SAT' && styles.saturdayText,
								dayOfWeek === '일' && styles.sundayText,
								dayOfWeek === 'SUN' && styles.sundayText,
							]}
						>
							{dayOfWeek}
						</Text>
					</View>
				);
			})}
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			marginBottom: 5,
		},
		dayText: {
			width: Dimensions.get('window').width / 7,
			alignItems: 'center',
		},
		text: {
			fontSize: 15,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Bold',
		},
		saturdayText: {
			color: colors[theme].BLUE_500,
			fontFamily: 'Pretendard-Bold',
		},
		sundayText: {
			color: colors[theme].RED_500,
			fontFamily: 'Pretendard-Bold',
		},
	});

export default DayOfWeeks;
