import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CommentImg from '../../../assets/images/Comment.png';

interface PostContentsProps {
	title?: string;
	content?: string;
	commentCount?: number;
}

function PostContents({ title, content, commentCount }: PostContentsProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	return (
		<>
			<View style={styles.contents}>
				<View style={styles.titleLayout}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<Text style={styles.content}>{content}</Text>
			</View>

			<TouchableOpacity
				style={[styles.rowGap10, styles.bottom]}
				activeOpacity={0.8}
				onPress={() => console.log('click')}
			>
				<View style={styles.translationLayout}>
					<MaterialIcons name="translate" color={colors[theme].WHITE} />
				</View>
				<Text style={styles.translationText}>{`${t('번역하기')}`}</Text>
			</TouchableOpacity>
			<View style={styles.verticalLine} />
			<TouchableOpacity
				activeOpacity={0.8}
				style={[styles.rowGap10, styles.bottom]}
				onPress={
					() => {}
					// navigation.navigate(communityNavigations.COMMUNITY_COMMENTS, { id })
				}
			>
				<Image source={CommentImg} />
				<Text style={styles.commentCount}>{commentCount}</Text>
			</TouchableOpacity>
		</>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		rowGap10: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		contents: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		content: {
			paddingHorizontal: 10,
			marginBottom: 40,
			fontSize: 14,
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Regular',
		},
		title: {
			fontSize: 14,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
		},
		titleLayout: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			borderRadius: 15,
			backgroundColor: colors[theme].GRAY_100,
		},
		bottom: {
			paddingHorizontal: 10,
		},
		translationLayout: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 16,
			height: 16,
			backgroundColor: colors[theme].GRAY_500,
			borderRadius: 3,
		},
		translationText: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		verticalLine: {
			width: '95%',
			alignSelf: 'center',
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GRAY_300,
		},
		commentCount: {
			color: colors[theme].BLACK,
		},
	});

export default PostContents;
