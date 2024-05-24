import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface ProgressBarProps {
	activeStepIndex: number;
	stepLength: number;
}

const ProgressBar = ({ activeStepIndex, stepLength }: ProgressBarProps) => {
	const progressPercentage = useMemo(() => {
		return ((activeStepIndex + 1) / stepLength) * 100;
	}, [activeStepIndex, stepLength]);

	const animatedWidth = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animatedWidth, {
			toValue: progressPercentage,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [progressPercentage]);

	const { theme } = useThemeStore();
	const styles = styling({
		theme,
		animatedWidth,
	});

	return (
		<View style={styles.progressBarBg}>
			<Animated.View style={styles.progressBar} />
		</View>
	);
};

const styling = ({
	theme,
	animatedWidth,
}: {
	theme: ThemeMode;
	animatedWidth: Animated.Value;
}) =>
	StyleSheet.create({
		progressBarBg: {
			width: '90%',
			height: 3,
			marginTop: 5,
			alignSelf: 'center',
			backgroundColor: colors[theme].GRAY_300,
		},
		progressBar: {
			position: 'absolute',
			width: animatedWidth.interpolate({
				inputRange: [0, 100],
				outputRange: ['0%', '100%'],
			}),
			height: 3,
			backgroundColor: colors[theme].GREEN_500,
		},
	});

export default ProgressBar;
