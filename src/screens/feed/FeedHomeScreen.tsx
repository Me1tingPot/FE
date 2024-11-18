import {
	FlatList,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp } from '@react-navigation/native';
// import FeedPartyList from '@/components/feed/FeedPartyList';
import {
	colors,
	communityNavigations,
	partyNavigations,
	wishNavigations,
} from '@/constants';
// import { useStomp } from '@/hooks/useStomp';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import PartyMenu from '../../assets/images/PartyMenu.webp';
import QuestionMenu from '../../assets/images/QuestionMenu.webp';
import ScheduleMenu from '../../assets/images/ScheduleMenu.webp';

interface FeedHomeScreenProps {
	navigation: NavigationProp<FeedStackParamList>;
}

const bannerImg =
	'https://images.unsplash.com/photo-1606357887928-49ad46ca4882?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxLb3JlYXxlbnwwfHwwfHx8MA%3D%3D';

const menuData = [
	{ title: '내 주변 파티', img: PartyMenu, path: partyNavigations.PARTY_LIST },
	{
		title: '예약된 일정',
		img: ScheduleMenu,
		path: wishNavigations.WISH_RESERVATION,
	},
	{
		title: '질문',
		img: QuestionMenu,
		path: communityNavigations.COMMUNITY_QUESTION,
	},
];

function FeedHomeScreen({ navigation }: FeedHomeScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<TouchableOpacity
					style={styles.bannerContainer}
					onPress={() => navigation.navigate('PartyHome')}
					activeOpacity={1}
				>
					<Image source={{ uri: bannerImg }} style={styles.bannerImg} />
					<LinearGradient
						colors={['transparent', colors[theme].WHITE]}
						style={styles.gradient}
					/>
					<View style={styles.bannerContent}>
						<View>
							<Text style={styles.bannerTitle}>파티 호스트가 되어</Text>
							<Text style={styles.bannerTitle}>친구들을</Text>
							<Text style={styles.bannerTitle}>모아보세요!</Text>
						</View>

						<Text style={styles.bannerSubTitle}>파티 주최하기</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.postBanner}
					onPress={() => navigation.navigate('CommunityPosting')}
				>
					<MaterialIcons
						name="signpost"
						size={25}
						color={colors[theme].BLACK}
					/>
					<Text style={styles.postTitle}>
						당신의 기록을 자유롭게 공유하세요
					</Text>
					<Text style={styles.postDescription}>
						포스팅을 업로드하고, 서로의 취향을 공유해보세요
					</Text>
				</TouchableOpacity>
				{/* <FeedPartyList /> */}

				<View style={styles.menuCardContainer}>
					<FlatList
						data={menuData}
						horizontal
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => navigation.navigate(item.path)}>
								<Image source={item.img} style={styles.menuCardImg} />
							</TouchableOpacity>
						)}
					/>
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
		bannerContainer: {
			height: 450,
		},
		bannerImg: {
			width: '100%',
			height: '100%',
		},
		gradient: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			height: '50%', // Adjust the height as needed
		},
		bannerContent: {
			position: 'absolute',
			paddingVertical: 30,
			paddingHorizontal: 20,
			gap: 10,
		},
		bannerTitle: {
			color: colors[theme].UNCHANGE_WHITE,
			fontSize: 30,
			fontFamily: 'Pretendard-Bold',
		},
		bannerSubTitle: {
			color: colors[theme].UNCHANGE_WHITE,
			fontSize: 20,
			fontFamily: 'Pretendard-Medium',
		},
		menuCardContainer: {
			flexDirection: 'row',
			gap: 10,
			marginTop: 10,
			marginLeft: 10,
			marginBottom: 20,
		},
		menuCardImg: {
			width: 150,
			height: 200,
			borderRadius: 10,
			margin: 5,
		},
		menuCardTitle: {
			position: 'absolute',
			top: 20,
			left: 20,
			fontSize: 17,
			color: colors[theme].WHITE,
			fontFamily: 'Pretendard-Bold',
		},
		postBanner: {
			gap: 7,
			padding: 20,
			marginVertical: 20,
			marginHorizontal: 20,
			borderRadius: 10,
			backgroundColor: colors[theme].GRAY_100,
		},
		postTitle: {
			color: colors[theme].UNCHANGE_BLACK,
			fontSize: 17,
			fontFamily: 'Pretendard-Light',
			marginTop: 5,
		},
		postDescription: {
			color: colors[theme].GRAY_500,
			fontSize: 14,
			fontFamily: 'Pretendard-Mediim',
		},
	});

export default FeedHomeScreen;
