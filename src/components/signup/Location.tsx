import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

type LocationProps = {
	onNext: () => void;
};

const Location = ({ onNext }: LocationProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('어디에 계신가요?')}</Text>
					<Text style={styles.description}>
						{t('위치 정보를 이용하여')}{' '}
						<Text style={styles.textPoint}>{t('가까운 파티')}</Text>
						{t('를 추천해드릴게요.')}
					</Text>
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
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
	});

export default Location;
