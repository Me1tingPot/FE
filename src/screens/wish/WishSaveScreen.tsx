import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import PartyCard from '@/components/common/PartyCard';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface WishSaveScreenProps {}

const WishSaveScreen = ({}: WishSaveScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.buttonContainer}>
				<CustomButton
					label={t('모집 중')}
					size="small"
					textStyle={{ fontSize: 15 }}
				/>
				<CustomButton
					label={t('모집 예정')}
					size="small"
					textStyle={{ fontSize: 15, textAlign: 'center' }}
				/>
				<CustomButton
					label={t('마감')}
					size="small"
					textStyle={{ fontSize: 15 }}
				/>
			</View>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<PartyCard />
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
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginVertical: 20,
		},
		scrollContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			paddingHorizontal: 20,
			paddingVertical: 20,
		},
	});

export default WishSaveScreen;
