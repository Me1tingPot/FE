import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { colors, communityNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { POST_DTO } from '@/types/api/types';
import { getDateLocaleFormat, getFormattedTime } from '@/utils';
import Comment from '../../assets/images/Comment.png';

// import Report from '../../assets/images/Report.png';

type PostingPreviewProps = {
	navigation: NavigationProp<CommunityStackParamList>;
	id: number;
	post: POST_DTO;
};

function PostingPreview({ navigation, id, post }: PostingPreviewProps) {
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
				navigation.navigate(communityNavigations.COMMUNITY_POSTING_DETAIL, {
					id,
				})
			}
		>
			<View style={styles.row}>
				{post.profileImg ? (
					<Image source={{ uri: '/' }} style={styles.userImg} />
				) : (
					<View style={styles.userImg}>
						<Ionicons
							name="person-sharp"
							color={colors[theme].GRAY_300}
							size={20}
						/>
					</View>
				)}
				<Text style={styles.flexText}>{post.name}</Text>
				{/* <TouchableOpacity
					activeOpacity={0.8}
					onPress={() => console.log('click')}
				>
					<Image source={Report} style={styles.report} />
				</TouchableOpacity> */}
			</View>
			<View style={[styles.innerPadding, styles.contentContainer]}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="clip">
					{post.title}
				</Text>
				<Text style={styles.content} numberOfLines={3} ellipsizeMode="clip">
					{post.content}
				</Text>
				{/* API 수정되면 이미지 표시 */}
				{/* <FlatList
					data={post}
					horizontal={true}
					renderItem={({ item, index }) => (
						<Image key={index} source={{ uri: item }} style={styles.image} />
					)}
				/> */}
			</View>
			<View style={styles.verticalLine} />
			<View style={[styles.row, styles.innerPadding]}>
				<Image source={Comment} />
				<Text style={styles.flexText}>
					{`${t('댓글')}`} {post.commentCount}
				</Text>
				<Text style={styles.date}>
					{date} {time}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			padding: 15,
			borderRadius: 20,
			borderWidth: 0.5,
			borderColor: colors[theme].EMERALD_500,
			backgroundColor: colors[theme].WHITE,
		},
		row: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		innerPadding: {
			paddingVertical: 10,
			paddingHorizontal: 30,
		},
		userImg: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: 30,
			height: 30,
			backgroundColor: colors[theme].GRAY_100,
			borderRadius: 500,
		},
		flexText: {
			flex: 1,
			color: colors[theme].GRAY_700,
		},
		date: {
			color: colors[theme].GRAY_700,
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		verticalLine: {
			width: '95%',
			alignSelf: 'center',
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GRAY_400,
		},
		content: {
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Light',
		},
		title: {
			color: colors[theme].BLACK,
			fontSize: 18,
			fontFamily: 'Pretendard-Regular',
		},
		image: {
			width: 56,
			height: 56,
			backgroundColor: colors[theme].GRAY_300,
			marginRight: 10,
		},
		imageLayout: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
		},
		report: {
			width: 14,
			height: 11,
			alignSelf: 'center',
		},
	});

export default PostingPreview;
