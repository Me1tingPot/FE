import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

interface LoginEmailProps {
	onNext: () => void;
}

const LoginEmail = ({ onNext }: LoginEmailProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{t('이메일을 입력해주세요.')}</Text>
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomTextInput
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						inputMode="email"
						variant={errors.email ? 'error' : 'default'}
						placeholder={t('예시) melting_pot@gmail.com')}
						placeholderTextColor={colors[theme].GRAY_300}
						onSubmitEditing={({ nativeEvent: { text } }) => {
							if (text) {
								onNext();
							}
						}}
					/>
				)}
			/>

			<View style={styles.buttonLayout}>
				<CustomButton
					label={t('다음으로')}
					onPress={onNext}
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
		title: {
			fontSize: 20,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Light',
		},
		buttonLayout: {
			marginTop: 'auto',
		},
	});

export default LoginEmail;
