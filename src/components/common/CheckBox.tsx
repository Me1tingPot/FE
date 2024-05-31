import { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, ViewStyle } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

export const checkBoxVariants = ['square', 'circle'] as const;
type checkBoxVariant = (typeof checkBoxVariants)[number];

export const checkBoxSizes = ['s', 'm', 'l'] as const;
type checkBoxSize = (typeof checkBoxSizes)[number];

interface CheckBoxProps {
	variant?: checkBoxVariant;
	size?: checkBoxSize;
	isChecked: boolean;
	disabled?: boolean;
	onValueChangedHanlder: (checked: boolean) => void;
	children?: ReactNode;
	style?: ViewStyle;
}

function CheckBox({
	variant = 'square',
	size = 's',
	isChecked,
	disabled = false,
	onValueChangedHanlder,
	children,
	style,
}: CheckBoxProps) {
	const { theme } = useThemeStore();
	const styles = styling({ theme, isChecked, size, disabled, variant });
	return (
		<Pressable
			style={[styles.container, style]}
			onPress={() => onValueChangedHanlder(isChecked)}
			disabled={disabled}
		>
			<View style={styles.checkBox}>
				<Octicons
					name="check"
					color={isChecked ? colors[theme].WHITE : colors[theme].GRAY_100}
					size={size === 's' ? 10 : size === 'm' ? 15 : 20}
				/>
			</View>
			{children}
		</Pressable>
	);
}

const styling = ({
	theme,
	isChecked,
	size,
	disabled,
	variant,
}: {
	theme: ThemeMode;
	isChecked: boolean;
	size: checkBoxSize;
	disabled: boolean;
	variant: checkBoxVariant;
}) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'row',
			gap: 7,
			alignItems: 'center',
		},
		checkBox: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 2,
			width: size === 's' ? 14 : size === 'm' ? 18 : 23,
			height: size === 's' ? 14 : size === 'm' ? 18 : 23,
			borderRadius: variant === 'circle' ? 500 : 3,
			backgroundColor: disabled
				? colors[theme].GRAY_200
				: isChecked
					? colors[theme].EMERALD_500
					: colors[theme].GRAY_300,
		},
	});

export default CheckBox;
