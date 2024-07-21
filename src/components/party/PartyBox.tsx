import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import dayjs from 'dayjs';
import { colors, partyNavigations } from '@/constants';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { PARTY_DATA } from '@/types/api/types';
import IconCircleButton from '../common/IconCircleButton';

interface PartyBoxProps {
	navigation: NavigationProp<PartyStackParamList>;
	partyData: PARTY_DATA;
}

function PartyBox({ navigation, partyData }: PartyBoxProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const {
		id,
		subject,
		locationAddress,
		owner,
		startTime,
		maxParticipant,
		minParticipant,
	} = partyData;

	const handlePressEnterRoom = (id: number) => {
		// TODO: id 넘기기
		navigation.navigate(`${partyNavigations.PARTY_DETAIL}`);
	};

	const renderRightActions = () => (
		<View style={styles.rightActionContainer}>
			<IconCircleButton
				family="Ionicons"
				name="trash"
				color={colors[theme].WHITE}
				style={{ backgroundColor: colors[theme].RED_500 }}
			/>
		</View>
	);

	return (
		<Swipeable renderRightActions={renderRightActions}>
			<Pressable
				style={({ pressed }) => [
					styles.container,
					pressed && styles.pressedContainer,
				]}
				onPress={() => handlePressEnterRoom(id)}
			>
				<View style={styles.contentContainer}>
					<View style={styles.badge}>
						<Text style={styles.badgeText}>모집 중</Text>
					</View>
					<View style={styles.imageContainer}>
						<Image
							source={require('@/assets/user-default.png')}
							style={styles.image}
						/>
						<View style={styles.textContainer}>
							<Text style={styles.titleText} numberOfLines={2}>
								{subject}
							</Text>
							<Text style={styles.descText} numberOfLines={1}>
								{locationAddress}
							</Text>
						</View>
					</View>
					<View style={styles.dividerContainer}>
						<View style={styles.divider} />
					</View>
					<View style={styles.detailInfoContainer}>
						<View style={styles.iconContainer}>
							<Ionicons name="happy" size={20} color={colors[theme].GRAY_500} />
							<Text style={styles.iconFont}>{owner.name}</Text>
						</View>
						<View style={styles.iconContainer}>
							<Ionicons
								name="calendar"
								size={20}
								color={colors[theme].GRAY_500}
							/>
							<Text style={styles.iconFont}>
								{dayjs(startTime).format('YYYY-MM-DD')}
							</Text>
						</View>
					</View>
					<View style={styles.detailInfoContainer}>
						<View style={styles.iconContainer}>
							<Ionicons name="time" size={20} color={colors[theme].GRAY_500} />
							<Text style={styles.iconFont}>
								{dayjs(startTime).format('hh:mm:ss A')}
							</Text>
						</View>
						<View style={styles.iconContainer}>
							<Ionicons
								name="people"
								size={20}
								color={colors[theme].GRAY_500}
							/>
							<Text style={styles.iconFont}>
								참여인원 ({minParticipant}~{maxParticipant})
							</Text>
						</View>
					</View>
				</View>
			</Pressable>
		</Swipeable>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			backgroundColor: colors[theme].WHITE,
			borderRadius: 20,
			borderColor: colors[theme].EMERALD_500,
			borderWidth: 4,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: {
				width: 0,
				height: 8,
			},
			shadowOpacity: 0.2,
			shadowRadius: 8.65,
			elevation: 8,
			marginBottom: 10,
			padding: 10,
		},
		pressedContainer: {
			backgroundColor: colors[theme].GRAY_100,
		},
		contentContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
		},
		badge: {
			width: 50,
			height: 25,
			backgroundColor: colors[theme].EMERALD_500,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			top: 5,
			left: 8,
			borderRadius: 12,
			overflow: 'hidden',
		},
		badgeText: {
			color: colors[theme].WHITE,
			fontSize: 12,
		},
		imageContainer: {
			marginTop: 10,
			flexDirection: 'row',
			width: 260,
			gap: 10,
			paddingHorizontal: 10,
		},
		image: {
			width: 45,
			height: 45,
		},
		textContainer: {
			flexDirection: 'column',
			marginTop: 10,
		},
		titleText: {
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
		},
		descText: {
			color: colors[theme].GRAY_500,
			fontFamily: 'Pretendard-Light',
			fontSize: 10,
		},
		dividerContainer: {
			alignItems: 'center',
			marginVertical: 10,
		},
		divider: {
			borderBottomWidth: 1,
			width: '90%',
			borderBottomColor: colors[theme].GRAY_200,
		},
		detailInfoContainer: {
			flexDirection: 'row',
			gap: 10,
			justifyContent: 'space-around',
			padding: 2,
		},
		iconContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 2,
		},
		iconFont: {
			color: colors[theme].GRAY_500,
			fontSize: 13,
		},
		rightActionContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colors[theme].GRAY_100,
			width: 100,
			borderRadius: 20,
			margin: 4,
		},
		actionButton: {
			backgroundColor: colors[theme].EMERALD_500,
			marginHorizontal: 5,
			borderRadius: 10,
		},
		actionButtonText: {
			color: colors[theme].WHITE,
		},
	});

export default PartyBox;
