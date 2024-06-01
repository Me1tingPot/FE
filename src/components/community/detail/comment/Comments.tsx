import { Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CommentImg from '../../../../assets/images/Comment.png';
import CommentsView from './CommentsView';

interface CommentsProps {}

const Comments = ({}: CommentsProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<>
			<View style={[styles.rowGap10, styles.bottom]}>
				<Image source={CommentImg} />
				<Text style={styles.commentCount}>3</Text>
			</View>
			<View style={styles.verticalLine} />
			<View style={styles.commentLayout}>
				{new Array(10).fill(null).map((_, idx) => (
					<CommentsView key={idx} />
				))}
			</View>
		</>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		rowGap10: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		bottom: {
			paddingHorizontal: 10,
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
		commentLayout: {
			gap: 10,
			paddingHorizontal: 10,
		},
	});

export default Comments;
