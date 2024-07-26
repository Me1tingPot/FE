import React, { useEffect, useRef } from 'react';
import {
	Animated,
	DimensionValue,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CustomPopOverProps {
	menu: {
		onPress: () => void;
		name: string;
	}[];
	top?: DimensionValue;
	bottom?: DimensionValue;
	left?: DimensionValue;
	right?: DimensionValue;
	isVisible: boolean;
}

function CustomPopOver({
	menu,
	top = 'auto',
	bottom = 'auto',
	left = 'auto',
	right = 'auto',
	isVisible,
}: CustomPopOverProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme, top, bottom, right, left);
	const translateY = useRef(new Animated.Value(-50)).current;
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (isVisible) {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: -200,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [isVisible, translateY, opacity]);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					transform: [{ translateY }],
					opacity,
				},
			]}
		>
			{menu.slice(0, menu.length - 1).map((item, index) => (
				<TouchableOpacity key={index} onPress={item.onPress}>
					<Text style={styles.menuText}>{item.name}</Text>
					<View style={styles.line} />
				</TouchableOpacity>
			))}

			<TouchableOpacity onPress={menu[menu.length - 1].onPress}>
				<Text style={styles.menuText}>{menu[menu.length - 1].name}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
}

export default CustomPopOver;

const styling = (
	theme: ThemeMode,
	top: DimensionValue,
	bottom: DimensionValue,
	right: DimensionValue,
	left: DimensionValue,
) =>
	StyleSheet.create({
		container: {
			position: 'absolute',
			top: top,
			bottom: bottom,
			right: right,
			left: left,
			width: 150,
			backgroundColor: colors[theme].GRAY_100,
			borderRadius: 10,
			padding: 13,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.2,
			elevation: 2,
		},
		line: {
			borderBottomColor: colors[theme].GRAY_300,
			borderBottomWidth: 0.5,
			marginTop: 6,
			marginBottom: 6,
		},
		displayNone: {
			display: 'none',
		},
		menuText: {
			color: colors[theme].BLACK,
		},
	});
