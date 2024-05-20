import { StyleSheet, Text, View } from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

const Sex = ({ onNext }: { onNext: () => void }) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<Text>안녕하세요!</Text>
			<Text>당신의 성별을 선택해주세요.</Text>

			<View style={styles.buttonContainer}>
				<View style={styles.buttonLayout}>
					<CustomButton label="여성" />
				</View>
				<View style={styles.buttonLayout}>
					<CustomButton label="남성" />
				</View>
			</View>

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

			paddingVertical: 50,
			paddingHorizontal: 30,
		},
		buttonContainer: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',

			paddingHorizontal: 30,
			marginTop: 50,
		},
		buttonLayout: {
			width: '35%',
		},
		buttonPosition: {
			marginTop: 'auto',
		},
	});

export default Sex;
