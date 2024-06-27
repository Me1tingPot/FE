import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';
import { authNavigations, colors } from '@/constants';
import useMail from '@/hooks/queries/useMail';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type EmailProps = {
	navigation: NavigationProp<AuthStackParamList>;
	onNext: () => void;
};

const Email = ({ onNext, navigation }: EmailProps) => {
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<SignupInputs>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const email = watch('email');
	const { postMailMutation, duplicationMailMutation } = useMail();

	const handleNext = () => {
		duplicationMailMutation.mutate(
			{ email },
			{
				onSuccess: () => {
					postMailMutation.mutate(
						{ email },
						{
							onSuccess: () => {
								onNext();
							},
							onError: error => {
								console.log(error.response);
								Toast.show({
									type: 'error',
									text1: error.response?.data.message || t('이메일 인증 에러'),
									visibilityTime: 2000,
									position: 'bottom',
								});
							},
						},
					);
				},
				onError: error => {
					Toast.show({
						type: 'error',
						text1: error.response?.data.message || t('이미 가입된 메일입니다.'),
						visibilityTime: 2000,
						position: 'bottom',
					});
					navigation.navigate(authNavigations.AUTH_HOME);
				},
			},
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('이메일을 입력해주세요.')}</Text>
					<Text style={styles.description}>
						{t('신분 인증 후에는 해당 이메일로 로그인할 수 있어요.')}
					</Text>
				</View>

				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomTextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder={t('예시) melting_pot@gmail.com')}
							inputMode="email"
							variant={errors.email ? 'error' : 'default'}
							placeholderTextColor={colors[theme].GRAY_300}
							onSubmitEditing={({ nativeEvent: { text } }) => {
								if (text) {
								}
							}}
							message={
								errors.email?.message && t('올바른 이메일 형식이 아닙니다.')
							}
						/>
					)}
				/>
			</ScrollView>

			<View style={styles.buttonPosition}>
				<CustomButton
					label={t('다음으로')}
					onPress={handleNext}
					variant={'filled'}
					disabled={errors.email?.message || !email ? true : false}
					isLoading={
						duplicationMailMutation.isPending || postMailMutation.isPending
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

export default Email;
