import { useState } from 'react';
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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import PartyCard from '@/components/common/PartyCard';
import QuestionPreview from '@/components/community/QuestionPreview';
import { colors, userNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const menuList = ['작성한 글', '댓글단 글', '활동 내역'] as const;
type menuType = (typeof menuList)[number];
export interface UserProfileScreenProps {
	navigation: NavigationProp<CommunityStackParamList>;
}

const userImg =
	'https://images.unsplash.com/photo-1696268516413-56e2c7c37639?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D';

function UserProfileScreen({ navigation }: UserProfileScreenProps) {
	const [click, setClick] = useState<menuType>('작성한 글');
	const { theme } = useThemeStore();
	const { t } = useTranslation();
	const styles = styling(theme);
	const userNavigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.profileContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() =>
							userNavigation.navigate(userNavigations.USER_PROFILE_IMAGE)
						}
					>
						<Image source={{ uri: userImg }} style={styles.userImg} />
					</TouchableOpacity>

					<View style={{ gap: 30 }}>
						<View style={{ gap: 10 }}>
							<Text style={styles.name}>Sunny Kim</Text>
							<Text style={styles.description}>
								반가워요!반가워요!반가워요!반가워요!
							</Text>
						</View>

						<View style={styles.userInfo}>
							<View>
								<Text style={styles.profileText}>{`${t('활동 내역')}`}</Text>
								<Text style={styles.description}>주최 1회, 참여 6회</Text>
							</View>
							<View>
								<Text style={styles.profileText}>{`${t('국적')}`}</Text>
								<Text style={styles.description}>캐나다</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.menuContainer}>
					{menuList.map((item, index) => (
						<TouchableOpacity
							key={index}
							activeOpacity={0.8}
							onPress={() => setClick(item)}
							style={click === item ? styles.clicked : styles.unClicked}
						>
							<Text style={styles.menuText}>{`${t(item)}`}</Text>
						</TouchableOpacity>
					))}
				</View>

				{click === '댓글단 글' || click === '작성한 글' ? (
					<View style={styles.contents}>
						{new Array(5).fill(null).map((_, idx) => (
							<QuestionPreview navigation={navigation} id={idx} key={idx} />
						))}
					</View>
				) : (
					<View style={styles.contents}>
						{new Array(5).fill(null).map((_, idx) => (
							<PartyCard key={idx} />
						))}
					</View>
				)}
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
		contentContainer: {
			gap: 20,
			padding: 20,
		},
		headerContainer: {
			gap: 10,
			padding: 10,
		},
		name: {
			fontSize: 17,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Bold',
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
		profileContainer: {
			flexDirection: 'row',
			gap: 20,
			alignItems: 'center',
			padding: 20,
			paddingTop: 0,
			borderBottomColor: colors[theme].GRAY_200,
			borderBottomWidth: 1,
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
	});

export default UserProfileScreen;
