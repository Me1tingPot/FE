import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants';
import useMail from '@/hooks/queries/useMail';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

interface EmailVerificationProps {
	onNext: () => void;
}

// TODO : 메일 인증 요청 및 인증 번호 확인 api 연결 필요
const EmailVerification = ({ onNext }: EmailVerificationProps) => {
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<SignupInputs>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const { verificationMailMutation } = useMail();
	const code = watch('emailVerifycation');
	const email = watch('email');

	const handleNext = () => {
		verificationMailMutation.mutate(
			{
				email,
				code,
			},
			{
				onSuccess: () => {
					onNext();
				},
				onError: error => {
					Toast.show({
						type: 'error',
						text1: error.response?.data.message || t('이메일 인증 에러'),
						visibilityTime: 2000,
						position: 'bottom',
					});
				},
			},
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('인증메일을 확인해주세요.')}</Text>
					<Text style={styles.description}>
						{t('신분 인증 후에는 해당 이메일로 로그인할 수 있어요.')}
					</Text>
				</View>

				<Controller
					control={control}
					name="emailVerifycation"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomTextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="인증번호 입력"
							inputMode="numeric"
							variant={errors.emailVerifycation?.message ? 'error' : 'default'}
							placeholderTextColor={colors[theme].GRAY_300}
							onSubmitEditing={({ nativeEvent: { text } }) => {
								if (text) {
									onNext();
								}
							}}
							message={
								errors.emailVerifycation?.message &&
								t('인증번호는 6자리 숫자입니다.')
							}
							maxLength={6}
						/>
					)}
				/>
			</ScrollView>

			<View style={styles.buttonPosition}>
				<CustomButton
					label={t('다음으로')}
					onPress={handleNext}
					variant={'filled'}
					disabled={errors.emailVerifycation?.message || !code ? true : false}
					isLoading={verificationMailMutation.isPending}
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
	});

export default EmailVerification;
