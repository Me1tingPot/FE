import { StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type MultipleGradientBgTextInputProps = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	colors?: string[];
};

const MultipleGradientBgTextInput = ({
	value,
	onChangeText,
	placeholder = '여기에 입력해주세요.',
	colors = ['#DCFFEA', '#A8D5FF', '#60B3FF'],
}: MultipleGradientBgTextInputProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<LinearGradient colors={colors} style={styles.textLayout}>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				multiline
				placeholder={placeholder}
				style={styles.text}
			/>
		</LinearGradient>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		textLayout: {
			height: '100%',
			padding: 15,
			borderRadius: 20,
			opacity: 0.8,
		},
		text: {},
	});

export default MultipleGradientBgTextInput;
