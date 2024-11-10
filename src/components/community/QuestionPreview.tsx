import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { colors, communityNavigations, userNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { POST_DTO } from '@/types/api/types';
import { getDateLocaleFormat, getFormattedTime } from '@/utils';
import Comment from '../../assets/images/Comment.png';

// import Report from '../../assets/images/Report.png';

type QuestionPreviewProps = {
	navigation: NavigationProp<CommunityStackParamList>;
	id: number;
	post: POST_DTO;
};

function QuestionPreview({ navigation, id, post }: QuestionPreviewProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const date = getDateLocaleFormat(post.updatedAt);
	const time = getFormattedTime(post.updatedAt);

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
				<TouchableOpacity
					disabled
					onPress={() => navigation.navigate(userNavigations.USER)}
				>
					{post.profileImg ? (
						<Image source={{ uri: '/' }} style={styles.profileImg} />
					) : (
						<View style={styles.profileImg}>
							<Ionicons
								name="person-sharp"
								color={colors[theme].GRAY_300}
								size={20}
							/>
						</View>
					)}
				</TouchableOpacity>
				<View style={styles.userInfo}>
					<Text style={styles.name}>{post.name}</Text>
					<Text style={styles.date}>
						{date} {time}
					</Text>
				</View>
				{/* <TouchableOpacity
					activeOpacity={0.8}
					onPress={() => console.log('click')}
				>
					<Image source={Report} style={styles.report} />
				</TouchableOpacity> */}
			</View>
			<View style={styles.contents}>
				<View style={styles.titleLayout}>
					<Text style={styles.title} numberOfLines={1} ellipsizeMode="clip">
						{post.title}
					</Text>
				</View>
				<Text style={styles.content} numberOfLines={3} ellipsizeMode="clip">
					{post.content}
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
				<Text style={styles.commentCount}>{post.commentCount}</Text>
			</View>
		</TouchableOpacity>
	);
}

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
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: 30,
			height: 30,
			backgroundColor: colors[theme].GRAY_100,
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
