import { Image, StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Comment from '../../assets/images/Comment.png';
import Report from '../../assets/images/Report.png';

const PostPreview = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Image source={{ uri: '/' }} style={styles.profileImg} />
				<View style={styles.userInfo}>
					<Text style={styles.name}>Sunny Kim</Text>
					<Text style={styles.date}>24/07/07</Text>
				</View>
				<Pressable>
					<Image source={Report} style={styles.report} />
				</Pressable>
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
				<Pressable>
					<Text style={styles.more}>...더보기</Text>
				</Pressable>
			</View>
			<View style={styles.bottom}>
				<Image source={Comment} />
				<Text>3</Text>
			</View>
		</View>
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
	});

export default PostPreview;
