import {
	FlatList,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { colors } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface FeedHomeScreenProps {
	navigation: NavigationProp<FeedStackParamList>;
}

const bannerImg =
	'https://images.unsplash.com/photo-1606357887928-49ad46ca4882?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxLb3JlYXxlbnwwfHwwfHx8MA%3D%3D';

const cardImg1 =
	'https://images.unsplash.com/photo-1614755081202-77c42b6869ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxLb3JlYXxlbnwwfHwwfHx8MA%3D%3D';

const cardImg2 =
	'https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxLb3JlYXxlbnwwfHwwfHx8MA%3D%3D';

const partyImg1 =
	'https://images.unsplash.com/photo-1605971981986-e623e8e16f33?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxLb3JlYXxlbnwwfHwwfHx8MA%3D%3D';
const partyImg2 =
	'https://images.unsplash.com/photo-1591325494384-f9f8e31322f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxLb3JlYXxlbnwwfHwwfHx8MA%3D%3D';

function FeedHomeScreen({ navigation }: FeedHomeScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.bannerContainer}>
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
				</View>

				<View style={styles.partyContainer}>
					<Text style={styles.partyTitle}>인기 파티</Text>
					<FlatList
						contentContainerStyle={styles.partyContentContainer}
						data={new Array(10).fill({
							title: '경복궁 파티',
							img: partyImg1,
							people: 4,
							date: '2024/06/21',
						})}
						horizontal
						renderItem={({ item, index }) => (
							<View style={styles.partyCard}>
								<Image source={{ uri: item.img }} style={styles.partyImage} />
								<Text style={styles.partyInnerTitle}>{item.title}</Text>

								<View style={styles.partyInfo}>
									<Text style={styles.partyInfoText}>{item.date}</Text>
									<Text style={styles.partyInfoText}>
										모집 인원 {item.people}
									</Text>
								</View>

								<Text style={styles.partyMore}>더보기</Text>
							</View>
						)}
					/>
				</View>

				<View style={styles.menuCardContainer}>
					<FlatList
						data={[
							{ title: '내 주변 파티', img: cardImg1 },
							{ title: '예약된 일정', img: cardImg2 },
							{ title: '질문', img: cardImg1 },
						]}
						horizontal
						renderItem={({ item, index }) => (
							<>
								<Image
									source={{ uri: item.img }}
									style={styles.menuCardImg}
									key={index}
								/>
								<Text style={styles.menuCardTitle}>{item.title}</Text>
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
			height: 220,
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
		menuCardContainer: {
			flexDirection: 'row',
			gap: 10,
			marginTop: 40,
			marginLeft: 10,
			marginBottom: 20,
		},
		menuCardImg: {
			width: 150,
			height: 180,
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
