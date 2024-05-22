import { FieldError, UseFormSetValue } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

type LocationProps = {
	onNext: () => void;
	setValue: UseFormSetValue<SignupInputs>;
	error?: FieldError | undefined;
};

const Location = ({ onNext }: LocationProps) => {
	const { theme } = useThemeStore();
	const styles = styilng(theme);

	return (
		<View style={styles.conatiner}>
			<View>
				<Text style={styles.title}>어디에 계신가요?</Text>
				<Text style={styles.description}>
					위치 정보를 이용하여 <Text style={styles.textPoint}>가까운 파티</Text>
					를 추천해드릴게요.
				</Text>
			</View>

			<View style={styles.buttonPosition}>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
			</View>
		</View>
	);
};

const styilng = (theme: ThemeMode) =>
	StyleSheet.create({
		conatiner: {
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
			fontWeight: 700,
		},
	});

export default Location;
