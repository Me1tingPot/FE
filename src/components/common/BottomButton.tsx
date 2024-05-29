import React from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type IconFamilies = {
	Ionicons: 'Ionicons';
	MaterialIcons: 'MaterialIcons';
	Octicons: 'Octicons';
};

interface BottomButtonProps extends PressableProps {
	family: keyof IconFamilies;
	name: string;
	size?: number;
	color?: string;
}

const BottomButton = ({
	family,
	name,
	size = 30,
	color = '#fff',
	...props
}: BottomButtonProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable style={styles.bottomButton} {...props}>
			{family === 'Ionicons' && (
				<Ionicons name={name} color={color} size={size} />
			)}
			{family === 'MaterialIcons' && (
				<MaterialIcons name={name} color={color} size={size} />
			)}
			{family === 'Octicons' && (
				<Octicons name={name} color={color} size={size} />
			)}
		</Pressable>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		bottomButton: {
			backgroundColor: colors[theme].EMERALD_500,
			marginVertical: 5,
			height: 50,
			width: 50,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 30,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.5,
			elevation: 2,
		},
	});

export default BottomButton;
