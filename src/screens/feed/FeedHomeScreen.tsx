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
import { NavigationProp } from '@react-navigation/native';
// import FeedPartyList from '@/components/feed/FeedPartyList';
import { colors } from '@/constants';
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

				{/* <FeedPartyList /> */}

				<View style={styles.menuCardContainer}>
					<FlatList
						data={[
							{ title: '내 주변 파티', img: PartyMenu },
							{ title: '예약된 일정', img: ScheduleMenu },
							{ title: '질문', img: QuestionMenu },
						]}
						horizontal
						renderItem={({ item, index }) => (
							<>
								<Image
									source={item.img}
									style={styles.menuCardImg}
									key={index}
								/>
							</>
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
			marginTop: 20,
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
	});

export default FeedHomeScreen;
