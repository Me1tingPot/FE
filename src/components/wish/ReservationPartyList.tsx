import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors, feedTabNavigations } from '@/constants';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

interface ReservationPartyListProps {}

const ReservationPartyList = ({}: ReservationPartyListProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const data = [];
	const navigation = useNavigation<NavigationProp<FeedTabParamList>>();

	return (
		<ScrollView style={styles.container}>
			{data.length === 0 && (
				<View style={styles.reservationContainer}>
					<View style={styles.textContainer}>
						<Text style={styles.headText}>{t('예정된 파티가 없어요!')}</Text>
						<Text style={styles.subText}>
							{t('내 주변 다양한 파티에 참여해 보세요.')}
						</Text>
					</View>
					<CustomButton
						label={t('내 주변 파티 구경하러 가기')}
						size={'medium'}
						onPress={() => navigation.navigate(feedTabNavigations.PARTY_HOME)}
					/>
				</View>
			)}
		</ScrollView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			marginTop: 30,
		},
		reservationContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		textContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 20,
		},
		headText: {
			fontFamily: 'Pretendard-Medium',
			marginBottom: 10,
			fontSize: 22,
			color: colors[theme].BLACK,
		},
		subText: {
			fontFamily: 'Pretendard-Medium',
			fontSize: 15,
			color: colors[theme].BLACK,
		},
	});

export default ReservationPartyList;
