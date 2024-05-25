import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	Modal,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getLocales } from 'react-native-localize';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface DatePickerOptionProps {
	isVisible: boolean;
	date: Date;
	onChangeDate: (date: Date) => void;
	onConfirmDate: () => void;
	hideOption: () => void;
}

const DatePickerOption = ({
	isVisible,
	date,
	hideOption,
	onChangeDate,
	onConfirmDate,
}: DatePickerOptionProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<Modal visible={isVisible} transparent animationType="fade">
			<SafeAreaView style={styles.optionBackground}>
				<View style={styles.optionContainer}>
					<View style={styles.pickerContainer}>
						<DatePicker
							mode="date"
							date={date}
							onDateChange={onChangeDate}
							locale={getLocales()[0].languageCode}
							theme={theme === 'dark' ? 'dark' : 'light'}
						/>
					</View>
				</View>
				<View style={styles.optionContainer}>
					<Pressable style={styles.optionButton} onPress={onConfirmDate}>
						<Text style={styles.optionText}>{t('확인')}</Text>
					</Pressable>
					<View style={styles.divider} />
					<Pressable style={styles.optionButton} onPress={hideOption}>
						<Text style={styles.optionDangerText}>{t('취소')}</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		optionBackground: {
			flex: 1,
			justifyContent: 'flex-end',
			backgroundColor: 'rgba(0,0,0/0.5)',
		},
		optionContainer: {
			backgroundColor: colors[theme].GRAY_100,
			borderRadius: 15,
			marginHorizontal: 15,
			marginBottom: 10,
			overflow: 'hidden',
		},
		pickerContainer: {
			alignItems: 'center',
		},
		optionButton: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			height: 50,
			gap: 5,
		},
		optionText: {
			color: colors[theme].BLUE_500,
			fontSize: 18,
			fontWeight: '500',
		},
		divider: {
			borderBottomWidth: 1,
			borderBottomColor: colors[theme].GRAY_200,
		},
		optionDangerText: {
			color: colors[theme].RED_500,
			fontSize: 18,
			fontWeight: '500',
		},
	});

export default DatePickerOption;
