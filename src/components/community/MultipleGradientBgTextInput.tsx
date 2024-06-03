import { StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type MultipleGradientBgTextInputProps = {
	title: string;
	onChangeTitle: (text: string) => void;
	titlePlaceholder?: string;
	content: string;
	onChangeContent: (text: string) => void;
	contentPlaceholder?: string;
	backgroundColors?: string[];
};

const MultipleGradientBgTextInput = ({
	title,
	onChangeTitle,
	titlePlaceholder = '여기에 입력해주세요.',
	content,
	onChangeContent,
	contentPlaceholder,
	backgroundColors = ['#DCFFEA', '#A8D5FF', '#60B3FF'],
}: MultipleGradientBgTextInputProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<LinearGradient colors={backgroundColors} style={styles.textLayout}>
			<TextInput
				style={styles.title}
				placeholder={titlePlaceholder}
				value={title}
				onChangeText={onChangeTitle}
			/>
			<TextInput
				value={content}
				onChangeText={onChangeContent}
				multiline
				placeholder={contentPlaceholder}
				style={styles.content}
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
		title: {
			padding: 3,
			fontSize: 14,
		},
		content: {
			padding: 3,
			fontSize: 12,
		},
	});

export default MultipleGradientBgTextInput;
