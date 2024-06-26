import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
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
		watch,
	} = useFormContext<SignupInputs>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const password = watch('password');
	const checkPassword = watch('checkPassword');
	const isChecked = password === checkPassword;

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('비밀번호를 입력해주세요.')}</Text>
					<Text style={styles.description}>{t('추후 변경할 수 있어요.')}</Text>
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
								placeholder={t('비밀번호 입력')}
								message={
									(errors.password?.message &&
										t(
											'비밀번호는 영문/숫자/특수문자 조합으로 8~20자리 입니다.',
										)) ||
									(password && t('사용 가능한 비밀번호 입니다.')) ||
									t('최소 8자, 최대 20자')
								}
								variant={
									errors.password ? 'error' : value ? 'success' : 'default'
								}
								returnKeyType="next"
								secureTextEntry={true}
								placeholderTextColor={colors[theme].GRAY_300}
							/>
						)}
					/>

					<Controller
						control={control}
						name="checkPassword"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder={t('비밀번호 확인')}
								variant={
									isChecked
										? 'success'
										: errors.checkPassword?.message || (password && !isChecked)
											? 'error'
											: 'default'
								}
								onSubmitEditing={({ nativeEvent: { text } }) => {
									if (text) {
										onNext();
									}
								}}
								secureTextEntry={true}
								placeholderTextColor={colors[theme].GRAY_300}
								message={
									(isChecked && t('비밀번호가 일치합니다.')) ||
									(password &&
										!isChecked &&
										t('비밀번호가 일치하지 않습니다.')) ||
									errors.checkPassword?.message
								}
							/>
						)}
					/>
				</View>
			</ScrollView>

			<View style={styles.buttonPosition}>
				<CustomButton
					label={t('다음으로')}
					onPress={onNext}
					variant={'filled'}
					disabled={
						errors.password ||
						errors.checkPassword ||
						!password ||
						!checkPassword
							? true
							: false
					}
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
