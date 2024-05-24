import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

type SexProps = {
	onNext: () => void;
};

const Sex = ({ onNext }: SexProps) => {
	const {
		control,
		formState: { errors },
		setValue,
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>{t('안녕하세요!')}</Text>
				<Text style={styles.description}>
					{t('당신의')} <Text style={styles.textPoint}>{t('성별')}</Text>
					{t('을 선택해주세요.')}
				</Text>

				<View style={styles.buttonContainer}>
					<View style={styles.buttonLayout}>
						<Controller
							control={control}
							name="sex"
							render={() => (
								<CustomButton
									label={t('여성')}
									onPress={() => setValue('sex', '여성')}
								/>
							)}
						/>
					</View>
					<View style={styles.buttonLayout}>
						<Controller
							control={control}
							name="sex"
							render={() => (
								<CustomButton
									label={t('남성')}
									onPress={() => setValue('sex', '남성')}
								/>
							)}
						/>
					</View>
				</View>
			</ScrollView>

			<View style={styles.buttonPosition}>
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
			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		buttonContainer: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			paddingHorizontal: 30,
			marginTop: 50,
		},
		buttonLayout: {
			width: '40%',
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
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
	});

export default Sex;
