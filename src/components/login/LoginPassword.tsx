import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { colors, feedTabNavigations } from '@/constants';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

interface LoginPasswordProps {
	navigation: NavigationProp<AuthStackParamList>;
	onSubmit: (data: any) => Promise<void>;
}

const LoginPassword = ({ navigation, onSubmit }: LoginPasswordProps) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{t('비밀번호를 입력해주세요.')}</Text>
			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomTextInput
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						variant={errors.email ? 'error' : 'default'}
						placeholder={t('비밀번호 입력')}
						message={t('최소 8자, 최대 20자')}
						placeholderTextColor={colors[theme].GRAY_300}
					/>
				)}
			/>

			<View style={styles.buttonLayout}>
				<CustomButton
					label={t('로그인')}
					onPress={() => {
						handleSubmit(onSubmit)();
						navigation.navigate(feedTabNavigations.FEED_HOME);
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
		title: {
			fontSize: 20,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Light',
		},
		buttonLayout: {
			marginTop: 'auto',
		},
	});

export default LoginPassword;
