import React from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { CHAT_ROOM, ThemeMode } from '@/types';
import IconCircleButton from './IconCircleButton';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import { ChatStackParamList } from '@/navigations/stack/ChatStackNavigator';

dayjs.locale('ko');

interface IPartyCard {
	post: CHAT_ROOM[]
}

const PartyCard = ({ post }: IPartyCard) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const navigation = useNavigation<NavigationProp<ChatStackParamList>>();

	const handlePressEnterRoom = (id: number) => {
		navigation.navigate('ChatDetail', {
			id
		})
	}

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
		<>
			{post?.map(({
				chatRoomId,
				partySubject,
				partyLocationAddress,
				leaderName,
				partyStartTime,
				userCnt,
				partyMinParticipant,
				partyMaxParticipant
			}, index) => (
				<Swipeable key={index} renderRightActions={renderRightActions}>
					<Pressable
						style={({ pressed }) => [
							styles.container,
							pressed && styles.pressedContainer,
						]}
						onPress={() => handlePressEnterRoom(chatRoomId)}
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
										{partySubject}
									</Text>
									<Text style={styles.descText} numberOfLines={1}>
										{partyLocationAddress}
									</Text>
								</View>
							</View>
							<View style={styles.dividerContainer}>
								<View style={styles.divider} />
							</View>
							<View style={styles.detailInfoContainer}>
								<View style={styles.iconContainer}>
									<Ionicons name="happy" size={20} color={colors[theme].GRAY_500} />
									<Text style={styles.iconFont}>{leaderName}</Text>
								</View>
								<View style={styles.iconContainer}>
									<Ionicons
										name="calendar"
										size={20}
										color={colors[theme].GRAY_500}
									/>
									<Text style={styles.iconFont}>
										{dayjs(partyStartTime).format('YYYY-MM-DD')}
									</Text>
								</View>
								<View style={styles.iconContainer}>
									<Ionicons name="time" size={20} color={colors[theme].GRAY_500} />
									<Text style={styles.iconFont}>
										{dayjs(partyStartTime).format('hh:mm:ss A')}
									</Text>
								</View>
								<View style={styles.iconContainer}>
									<Ionicons
										name="people"
										size={20}
										color={colors[theme].GRAY_500}
									/>
									<Text style={styles.iconFont}>{userCnt} ({partyMinParticipant}~{partyMaxParticipant})</Text>
								</View>
							</View>
						</View>
					</Pressable>
				</Swipeable>
			))}
		</>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			height: 160,
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
			width: 100
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
			justifyContent: 'space-around',
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

export default PartyCard;
