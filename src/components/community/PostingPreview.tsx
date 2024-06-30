import { useTranslation } from 'react-i18next';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { colors, communityNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Comment from '../../assets/images/Comment.png';
import Report from '../../assets/images/Report.png';

type PostingPreviewProps = {
	navigation: NavigationProp<CommunityStackParamList>;
	id: number;
};

const testImg =
	'https://images.unsplash.com/photo-1605100958409-e084833953d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuYWxvZ3xlbnwwfHwwfHx8MA%3D%3D';

const imageList = new Array(4).fill(testImg);

function PostingPreview({ navigation, id }: PostingPreviewProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
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
				<Image source={{ uri: testImg }} style={styles.userImg} />
				<Text style={styles.flexText}>Sunny Kim</Text>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => console.log('click')}
				>
					<Image source={Report} style={styles.report} />
				</TouchableOpacity>
			</View>
			<View style={[styles.innerPadding, styles.contentContainer]}>
				<Text style={styles.title}>경복궁 파티 어쩌구</Text>
				<Text style={styles.content}>
					이번주에 잠실에서 만나려고 하는데요, 일단 저 포함 3명이고, 한국인 2명
					있어요.
				</Text>
				<FlatList
					data={imageList}
					horizontal={true}
					renderItem={({ item, index }) => (
						<Image key={index} source={{ uri: item }} style={styles.image} />
					)}
				/>
			</View>
			<View style={styles.verticalLine} />
			<View style={[styles.row, styles.innerPadding]}>
				<Image source={Comment} />
				<Text style={styles.flexText}>{`${t('댓글')}`} 3</Text>
				<Text style={styles.date}>2024/05/31</Text>
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
			width: 30,
			height: 30,
			backgroundColor: colors[theme].GRAY_300,
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
