import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface WishSaveScreenProps {}

const WishSaveScreen = ({}: WishSaveScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text>Wish Save Screen</Text>
				<Text>Wish Save Screen</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
	});

export default WishSaveScreen;
