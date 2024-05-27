import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateLocaleFormat } from '@/utils';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';
import DatePickerOption from './DatePickerOption';

type BirthProps = {
	onNext: () => void;
};

const Birth = ({ onNext }: BirthProps) => {
	const {
		control,
		formState: { errors },
		setValue,
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const [date, setDate] = useState(new Date());
	const [isPicked, setIsPicked] = useState(false);
	const dateOption = useModal();
	const formatDateString = getDateLocaleFormat(date, '/');

	const handleConfirmDate = () => {
		setIsPicked(true);
		dateOption.hide();
	};

	const handleChangeDate = (pickedDate: Date) => {
		setDate(pickedDate);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('생년월일을 알려주세요!')}</Text>
					<Text style={styles.description}>
						{t('나이 표시에 사용되며')}{' '}
						<Text style={styles.textPoint}>{t('이후 변경이 불가')}</Text>
						{t('합니다.')}
					</Text>
				</View>

				<Controller
					control={control}
					name="birth"
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<CustomTextInput
								value={isPicked ? formatDateString : t('----년 --월 --일')}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder={t('----년 --월 --일')}
								variant={'success'}
								icon={
									<MaterialIcons
										name="calendar-month"
										color={colors[theme].GRAY_300}
										size={25}
									/>
								}
								editable={false}
							/>
							<TouchableOpacity
								activeOpacity={0}
								style={styles.overlayButton}
								onPress={dateOption.show}
							/>
						</View>
					)}
				/>
			</ScrollView>

			<DatePickerOption
				isVisible={dateOption.isVisible}
				date={date}
				hideOption={dateOption.hide}
				onChangeDate={handleChangeDate}
				onConfirmDate={handleConfirmDate}
			/>
			<View style={styles.buttonPosition}>
				<CustomButton
					label={t('다음으로')}
					onPress={() => {
						setValue('birth', formatDateString);
						onNext();
					}}
					variant={'filled'}
				/>
			</View>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 30,
			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		buttonPosition: {
			marginTop: 'auto',
		},
		title: {
			fontSize: 20,
			color: colors[theme].GRAY_700,
		},
		description: {
			marginTop: 10,
			marginBottom: 30,
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
		overlayButton: {
			height: 70,
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
		},
	});

export default Birth;
