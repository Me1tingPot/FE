import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type PasswordProps = {
	onNext: () => void;
};

const Password = ({ onNext }: PasswordProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>비밀번호를 입력해주세요.</Text>
					<Text style={styles.description}>추후 변경할 수 있어요.</Text>
				</View>

				<View style={styles.buttonContainer}>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="비밀번호 입력"
								message="최소 8자, 최대 20자"
								variant={errors.password ? 'error' : 'default'}
							/>
						)}
					/>

					<Controller
						control={control}
						name="passwordCheck"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="비밀번호 확인"
								variant={errors.passwordCheck ? 'error' : 'default'}
							/>
						)}
					/>
				</View>
			</ScrollView>

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
		buttonContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			marginTop: 20,
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
	});

export default Password;
