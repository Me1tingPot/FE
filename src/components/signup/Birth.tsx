import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

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
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	let formatDateString = `${year}.${month}.${day}`;

	useEffect(() => {
		setValue('birth', formatDateString);
	}, [formatDateString]);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>생년월일을 알려주세요!</Text>
					<Text style={styles.description}>
						나이 표시에 사용되며{' '}
						<Text style={styles.textPoint}>이후 변경이 불가</Text>
						합니다.
					</Text>
				</View>

				<Controller
					control={control}
					name="date"
					render={({ field: { onChange, onBlur, value } }) => (
						<View>
							<CustomTextInput
								value={value || formatDateString}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="----년 --월 --일"
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
								onPress={() => setOpen(true)}
								style={styles.overlayButton}
							/>
						</View>
					)}
				/>
			</ScrollView>

			<DatePicker
				modal
				open={open}
				date={date}
				onConfirm={date => {
					setOpen(false);
					setDate(date);
				}}
				onCancel={() => {
					setOpen(false);
				}}
				mode="date"
				locale="ko"
				title="날짜 선택"
				confirmText="확인"
				cancelText="취소"
			/>

			<View style={styles.buttonPosition}>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
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
