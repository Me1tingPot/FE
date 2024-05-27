import React, { ReactNode } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	PressableProps,
	Dimensions,
	View,
	StyleProp,
	ViewStyle,
	TextStyle,
	ActivityIndicator,
} from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { colors } from '../../constants';

// 다른 곳에서 재사용될 수 있을지 생각해보기
export const buttonVariants = ['filled', 'outlined'] as const;
type buttonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ['large', 'medium', 'small'] as const;
type buttonSize = (typeof buttonSizes)[number];

interface CustomButtonProps extends PressableProps {
	label: string;
	variant?: buttonVariant;
	size?: buttonSize;
	inValid?: boolean;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	icon?: ReactNode;
	isLoading?: boolean;
	onPress?: () => void;
}

/**
 * Android & iOS에서 screen 높이 측정 방식이 다르다. (iOS는 상관 X 안드만 고려 O)
 * screen은 상태표시줄을 포함하고 영역을 출력함.
 * console.log('screen', Dimensions.get('screen').height)
 * window는 상태표시줄을 포함하지 않고 영역을 출력함.
 * console.log('window', Dimensions.get('window').height)
 * https://millo-l.github.io/ReactNative-Dimensions-get-window%EC%99%80-Dimentsions-get-screen%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/
 */

const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
	label,
	variant = 'filled',
	size = 'large',
	inValid = false,
	style = null,
	textStyle = null,
	icon = null,
	isLoading = false,
	onPress,
	...props
}: CustomButtonProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<Pressable
			disabled={inValid}
			style={({ pressed }) => [
				styles.container,
				pressed ? styles[`${variant}Pressed`] : styles[variant],
				inValid && styles.inValid,
				style,
			]}
			onPress={onPress}
			{...props}
		>
			<View style={styles[size]}>
				{isLoading ? (
					<ActivityIndicator
						color={
							variant === 'filled'
								? colors.light.UNCHANGE_WHITE
								: colors.light.UNCHANGE_BLACK
						}
					/>
				) : (
					<>
						{icon}
						<Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
							{label}
						</Text>
					</>
				)}
			</View>
		</Pressable>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			borderRadius: 50,
			justifyContent: 'center',
			flexDirection: 'row',
		},
		inValid: {
			opacity: 0.5,
		},
		filled: {
			backgroundColor: colors[theme].BLACK,
		},
		outlined: {
			borderColor: colors[theme].GRAY_500,
			borderWidth: 1,
		},
		filledPressed: {
			backgroundColor: colors[theme].GRAY_700,
		},
		outlinedPressed: {
			borderColor: colors[theme].BLACK,
			borderWidth: 1,
			opacity: 0.5,
		},
		text: {
			fontSize: 16,
			fontWeight: '500',
		},
		large: {
			width: '100%',
			paddingVertical: deviceHeight > 700 ? 15 : 10,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'row',
			gap: 5,
		},
		medium: {
			width: '70%',
			paddingVertical: deviceHeight > 700 ? 12 : 8,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'row',
			gap: 5,
		},
		small: {
			width: 100,
			height: 40,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		filledText: {
			color: colors[theme].WHITE,
		},
		outlinedText: {
			color: colors[theme].BLACK,
		},
	});

export default CustomButton;
