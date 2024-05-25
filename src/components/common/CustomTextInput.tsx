import { ReactNode } from 'react';
import {
	Platform,
	StyleProp,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

export const inputVariants = ['default', 'error', 'success'] as const;
type inputVariant = (typeof inputVariants)[number];

interface CustomTextInput extends TextInputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	icon?: ReactNode;
	isLoading?: boolean;
	message?: string;
	variant?: inputVariant;
}

const platformOS = Platform.OS;

function CustomTextInput({
	value,
	onChangeText,
	placeholder = '여기에 작성해주세요.',
	style,
	textStyle,
	icon,
	isLoading,
	keyboardType,
	message,
	variant = 'default',
	...props
}: CustomTextInput) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={[styles.container, style]}>
			<View style={[styles.textContainer, styles[variant]]}>
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					style={styles.text}
					{...props}
				/>
				<View style={styles.icon}>{icon}</View>
			</View>
			{message && (
				<Text style={[styles.message, styles[variant]]}>{message}</Text>
			)}
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		textContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			borderRadius: 30,
			backgroundColor: colors[theme].WHITE,
			paddingVertical: platformOS === 'android' ? 5 : 10,
			paddingHorizontal: 25,
			borderColor: colors[theme].GRAY_300,
			borderWidth: 1,
		},
		default: {},
		error: {
			borderColor: colors[theme].RED_500,
			color: colors[theme].RED_500,
		},
		success: {
			borderColor: colors[theme].GREEN_500,
			color: colors[theme].GREEN_500,
		},
		text: {
			flex: 1,
			paddingVertical: 10,
		},
		icon: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		message: {
			marginLeft: 20,
			fontSize: 12,
			color: colors[theme].GRAY_400,
		},
	});

export default CustomTextInput;
