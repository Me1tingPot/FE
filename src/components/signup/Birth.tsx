import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
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
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
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
					<CustomTextInput
						value={value}
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
					/>
				)}
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
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].BLACK,
			fontWeight: '700',
		},
	});

export default Birth;
