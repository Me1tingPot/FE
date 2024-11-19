import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '@/constants';
import useParty from '@/hooks/queries/useParty';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateLocaleFormat } from '@/utils';

function FeedPartyList() {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { useSearchPartyInfiniteLists } = useParty();
	const { data: partyList, isPending } = useSearchPartyInfiniteLists({
		query: '',
	});

	if (isPending) {
		return (
			<View style={styles.partyContainer}>
				<Text style={styles.partyTitle}>최근 파티</Text>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.partyContainer}>
			<Text style={styles.partyTitle}>최근 파티</Text>
			<FlatList
				contentContainerStyle={styles.partyContentContainer}
				data={partyList?.pages[0].data.content}
				horizontal
				renderItem={({ item, index }) => (
					<View style={styles.partyCard}>
						<Text style={styles.partyInnerTitle} numberOfLines={2}>
							{item.subject}
						</Text>

						<View style={styles.partyInfo}>
							<Text style={styles.partyInfoText}>
								{getDateLocaleFormat(item.startTime)}
							</Text>
							<Text style={styles.partyInfoText}>
								모집 인원 {item.participants.length}
							</Text>
						</View>

						<Text style={styles.partyMore}>더보기</Text>
					</View>
				)}
			/>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		partyContainer: {
			paddingLeft: 10,
			marginTop: 30,
		},
		partyTitle: {
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Bold',
			fontSize: 18,
			marginBottom: 5,
			paddingLeft: 10,
		},
		partyContentContainer: {
			gap: 10,
			padding: 10,
		},
		partyCard: {
			width: 190,
			alignItems: 'center',
			padding: 20,
			gap: 10,
			borderRadius: 20,
			backgroundColor: colors[theme].WHITE,
			shadowColor: colors[theme].GRAY_400,
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.5,
			shadowRadius: 4.65,
			elevation: 7,
		},
		partyImage: {
			width: '100%',
			height: '60%',
			borderRadius: 10,
		},
		partyInnerTitle: {
			marginRight: 'auto',
			fontFamily: 'Pretendard-Medium',
			color: colors[theme].GRAY_700,
			fontSize: 15,
		},
		partyInfo: {
			flexDirection: 'row',
			gap: 10,
			marginRight: 'auto',
		},
		partyInfoText: {
			marginRight: 'auto',
			fontFamily: 'Pretendard-Medium',
			color: colors[theme].GRAY_500,
			fontSize: 12,
		},
		partyMore: {
			marginLeft: 'auto',
			fontFamily: 'Pretendard-Bold',
			color: colors[theme].EMERALD_500,
			fontSize: 12,
		},
	});

export default FeedPartyList;
