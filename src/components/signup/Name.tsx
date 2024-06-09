import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import { FUNNEL_STEPS, SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type NameProps = {
	onNext: () => void;
};

const Name = ({ onNext }: NameProps) => {
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<SignupInputs>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('이름을 적어주세요.')}</Text>
					<Text style={styles.description}>
						<Text style={styles.textPoint}>{t('여권 상')}</Text>
						{t('의 영문 이름이 필요해요!')}
					</Text>
				</View>

				<View style={styles.nameContainer}>
					<Controller
						control={control}
						name={FUNNEL_STEPS.NAME}
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value}
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder={t('여권상의 영문 이름')}
								variant={errors?.name ? 'error' : 'default'}
								returnKeyType="next"
								placeholderTextColor={colors[theme].GRAY_300}
								message={errors.name?.message as string}
							/>
						)}
					/>
				</View>
				<Text style={[styles.textPoint, styles.title, styles.noticeTitle]}>
					{t('왜 여권에 기재된 이름이 필요한가요?')}
				</Text>
				<Text style={[styles.description, styles.noticeText]}>
					{t(
						'온오프라인 만남에서 벌어질 수 있는 신분상의 도용이나 이로 인한 피해, 로맨스 스캠 등 다양한 범죄를 예방하기 위해 국제적으로 통용되는 신분증에 기재된 이름을 정확히 적어주세요.',
					)}
				</Text>
			</ScrollView>
			<View style={styles.buttonPosition}>
				<CustomButton
					label={t('다음으로')}
					onPress={onNext}
					variant={'filled'}
					disabled={errors?.name ? true : false}
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
			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		nameContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 40,
			marginTop: 20,
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
			marginBottom: 10,
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		noticeTitle: {
			fontSize: 12,
			marginTop: 30,
			paddingHorizontal: 10,
		},
		noticeText: {
			fontSize: 12,
			paddingHorizontal: 10,
		},
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
	});

export default Name;
