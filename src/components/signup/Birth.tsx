import { useState } from 'react';
import { FieldError, UseFormSetValue } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type BirthProps = {
	onNext: () => void;
	setValue: UseFormSetValue<SignupInputs>;
	error?: FieldError | undefined;
};

const Birth = ({ onNext }: BirthProps) => {
	const [date, setDate] = useState('');
	const { theme } = useThemeStore();
	const styles = styilng(theme);

	return (
		<View style={styles.conatiner}>
			<View>
				<Text style={styles.title}>생년월일을 알려주세요!</Text>
				<Text style={styles.description}>
					나이 표시에 사용되며{' '}
					<Text style={styles.textPoint}>이후 변경이 불가</Text>
					합니다.
				</Text>
			</View>

			<CustomTextInput
				value={date}
				onChangeText={t => setDate(t)}
				placeholder="----년 --월 --일"
				variant={'success'}
				icon={
					<MaterialIcons
						name="calendar-month"
						color={colors[theme].GRAY_300}
						size={25}
					/>
				}
			/>

			<View style={styles.buttonPosition}>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
			</View>
		</View>
	);
};

const styilng = (theme: ThemeMode) =>
	StyleSheet.create({
		conatiner: {
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

			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].BLACK,
			fontWeight: 700,
		},
	});

export default Birth;
