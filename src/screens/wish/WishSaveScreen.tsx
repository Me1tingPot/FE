import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
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
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

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
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[colors[theme].BLACK]}
						tintColor={colors[theme].BLACK}
					/>
				}
			>
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
