import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface ImageInputProps {
	onChange: () => void;
	size?: 'large' | 'medium' | 'small';
}

const ImageInput = ({ onChange, size = 'small' }: ImageInputProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable
			style={({ pressed }) => [
				pressed && styles.imageInputPressed,
				styles.imageInput,
				size === 'large' && styles.largeImageInput,
				size === 'medium' && styles.mediumImageInput,
				size === 'small' && styles.smallImageInput,
			]}
			onPress={onChange}
		>
			<Ionicons
				name="camera-outline"
				size={20}
				color={colors[theme].GRAY_500}
			/>
			<Text style={styles.inputText}>사진 추가</Text>
		</Pressable>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		imageInput: {
			borderWidth: 1.5,
			borderStyle: 'dotted',
			borderColor: colors[theme].GRAY_300,

			alignItems: 'center',
			justifyContent: 'center',
			gap: 5,
		},
		smallImageInput: {
			height: 70,
			width: 70,
		},
		mediumImageInput: {
			height: 120,
			width: 120,
		},
		largeImageInput: {
			height: 150,
			width: 150,
		},
		imageInputPressed: {
			opacity: 0.5,
		},
		inputText: {
			fontSize: 12,
			color: colors[theme].GRAY_500,
		},
	});

export default ImageInput;
