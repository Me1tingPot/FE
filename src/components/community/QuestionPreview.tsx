import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { colors, communityNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Comment from '../../assets/images/Comment.png';
import Report from '../../assets/images/Report.png';

type QuestionPreviewProps = {
	navigation: NavigationProp<CommunityStackParamList>;
	id: number;
};

const testImg =
	'https://images.unsplash.com/photo-1555437858-e8521a85abc0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuYWxvZ3xlbnwwfHwwfHx8MA%3D%3D';

const QuestionPreview = ({ navigation, id }: QuestionPreviewProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.8}
			onPress={() =>
				navigation.navigate(communityNavigations.COMMUNITY_QUESTION_DETAIL, {
					id,
				})
			}
		>
			<View style={styles.top}>
				<Image source={{ uri: testImg }} style={styles.profileImg} />
				<View style={styles.userInfo}>
					<Text style={styles.name}>Sunny Kim</Text>
					<Text style={styles.date}>24/07/07</Text>
				</View>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => console.log('click')}
				>
					<Image source={Report} style={styles.report} />
				</TouchableOpacity>
			</View>
			<View style={styles.contents}>
				<View style={styles.titleLayout}>
					<Text style={styles.title}>
						잠실에서 모임 열건데 추천 맛집있나요?
					</Text>
				</View>
				<Text style={styles.content}>
					이번주에 잠실에서 만나려고 하는데요, 일단 저 포함 3명이고, 한국인 2명
					있어요.
				</Text>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => console.log('click')}
				>
					<Text style={styles.more}>...{`${t('더보기')}`}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.bottom}>
				<Image source={Comment} />
				<Text style={styles.commentCount}>3</Text>
			</View>
		</TouchableOpacity>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			borderBottomWidth: 5,
			borderBottomColor: colors[theme].GRAY_100,
		},
		top: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
		},
		userInfo: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 5,
		},
		name: {
			fontSize: 14,
			color: colors[theme].BLACK,
		},
		date: {
			fontSize: 10,
			color: colors[theme].BLACK,
		},
		report: {
			width: 14,
			height: 11,
			alignSelf: 'center',
		},
		profileImg: {
			width: 30,
			height: 30,
			backgroundColor: colors[theme].GRAY_300,
			borderRadius: 500,
		},
		title: {
			fontSize: 14,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Bold',
		},
		titleLayout: {
			padding: 10,
			borderRadius: 15,
			backgroundColor: colors[theme].GRAY_100,
		},
		content: {
			fontSize: 12,
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Regular',
		},
		more: {
			fontSize: 10,
			color: colors[theme].GRAY_700,
			marginLeft: 'auto',
		},
		contents: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		bottom: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			padding: 5,
		},
		commentCount: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
	});

export default QuestionPreview;
