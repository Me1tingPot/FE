import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '@/components/common/CustomButton';
import { colors } from '@/constants';
import useParty from '@/hooks/queries/useParty';
import usePopOver from '@/hooks/usePopOver';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PartyDetailScreenProps {
	route: {
		params: {
			id: number;
		};
	};
}

const testImg =
	'https://images.unsplash.com/photo-1721296378509-4d534a597dca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D';

function PartyDetailScreen({ route }: PartyDetailScreenProps) {
	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { useGetParty } = useParty();
	const { t } = useTranslation();
	const { data } = useGetParty(id);
	const partyData = data?.data;
	const { isOpen, handlePopOver } = usePopOver();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollviewContainer}>
				<View style={styles.partyContainer}>
					<Image source={{ uri: testImg }} style={styles.partyImg} />
					<View style={styles.partyInfoContainer}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>{partyData?.subject}</Text>
							<TouchableOpacity
								activeOpacity={0.7}
								style={styles.tanslateButton}
							>
								<MaterialIcons
									name="translate"
									color={colors[theme].UNCHANGE_WHITE}
									size={25}
								/>
							</TouchableOpacity>
						</View>
						<ScrollView>
							<Text style={styles.content}>
								{partyData?.contents[0].content}
							</Text>
						</ScrollView>
						<View style={styles.hashTagContainer}>
							{partyData?.locationCanBeChanged && (
								<Text style={styles.hashTag}>#추후변동가능성있음</Text>
							)}
							{partyData?.locationReserved && (
								<Text style={styles.hashTag}>#장소선정완료</Text>
							)}
						</View>
					</View>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.profileContainer}>
						<TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
							<Image source={{ uri: testImg }} style={styles.userImg} />
						</TouchableOpacity>

						<View style={{ gap: 30 }}>
							<View style={{ gap: 10 }}>
								<Text style={styles.name}>{partyData?.owner.name}</Text>
								<Text style={styles.description}>
									{partyData?.owner.introduction || '아직 소개가 없습니다.'}
								</Text>
							</View>

							<View style={styles.userInfo}>
								<View>
									<Text style={styles.profileText}>{`${t('활동 내역')}`}</Text>
									<Text style={styles.description}>
										주최 {partyData?.owner.partyCreationCount}회, 참여{' '}
										{partyData?.owner.partyParticipantCount}회
									</Text>
								</View>
								<View>
									<Text style={styles.profileText}>{`${t('국적')}`}</Text>
									<Text style={styles.description}>
										{partyData?.owner.nationality}
									</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<View style={{ flex: 3 }}>
							<CustomButton label="참여 신청" />
						</View>
						<View style={{ flex: 1 }}>
							<CustomButton
								label="저장"
								icon={
									<Ionicons
										name="bookmark-outline"
										size={25}
										color={colors[theme].WHITE}
									/>
								}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		scrollviewContainer: {
			flexGrow: 1,
			display: 'flex',
			flexDirection: 'column',
		},
		partyContainer: {
			position: 'relative',
			height: 500,
		},
		contentContainer: {
			flex: 1,
		},
		profileContainer: {
			flexDirection: 'row',
			flex: 1,
			gap: 20,
			alignItems: 'center',
			padding: 20,
			borderBottomColor: colors[theme].GRAY_200,
			borderBottomWidth: 1,
		},
		buttonContainer: {
			flex: 1,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 20,
			paddingVertical: 10,
			gap: 5,
		},
		partyInfoContainer: {
			width: '100%',
			maxHeight: 300,
			minHeight: 200,
			overflow: 'scroll',
			position: 'absolute',
			gap: 15,
			bottom: 0,
			paddingVertical: 20,
			paddingHorizontal: 25,
			backgroundColor: 'rgba(0, 0, 0, 0.4)',
			borderBottomLeftRadius: 13,
			borderBottomRightRadius: 13,
		},
		hashTagContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			marginTop: 'auto',
		},
		partyImg: {
			width: '100%',
			height: '100%',
			borderBottomLeftRadius: 13,
			borderBottomRightRadius: 13,
		},
		userImg: {
			width: 77,
			height: 77,
			backgroundColor: colors[theme].GRAY_300,
			borderRadius: 500,
		},
		userInfo: {
			flexDirection: 'row',
			gap: 20,
		},
		clicked: {
			paddingVertical: 5,
			paddingHorizontal: 20,
			backgroundColor: colors[theme].BLACK,
			borderRadius: 300,
		},
		unClicked: {
			paddingVertical: 5,
			paddingHorizontal: 20,
			backgroundColor: colors[theme].GRAY_400,
			borderRadius: 300,
		},
		menuText: {
			color: colors[theme].WHITE,
			fontSize: 12,
			fontFamily: 'Pretendard-Bold',
		},
		menuContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
		contents: {
			paddingHorizontal: 10,
			gap: 20,
		},
		description: {
			fontSize: 14,
			color: colors[theme].BLACK,
		},
		profileText: {
			fontSize: 14,
			color: colors[theme].GRAY_500,
			marginBottom: 5,
		},
		name: {
			fontSize: 17,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Bold',
		},
		title: {
			color: colors[theme].UNCHANGE_WHITE,
			fontFamily: 'Pretendard-Bold',
		},
		titleContainer: {
			display: 'flex',
			flexDirection: 'row',
			paddingBottom: 5,
			borderBottomColor: colors[theme].GRAY_500,
			borderBottomWidth: 0.5,
		},
		tanslateButton: {
			padding: 1,
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
			borderRadius: 2,
			marginLeft: 'auto',
		},
		content: {
			color: colors[theme].UNCHANGE_WHITE,
		},
		hashTag: {
			color: colors[theme].PINK_700,
			fontFamily: 'Pretendard-Bold',
		},
	});

export default PartyDetailScreen;
