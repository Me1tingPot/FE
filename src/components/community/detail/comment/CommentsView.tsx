import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { COMMENT_DTO } from '@/types/api/types';
import Comment from './Comment';

interface CommentsViewProps {
	comment?: COMMENT_DTO;
	show: () => void;
	setCommentId: (id: number | null) => void;
	commentId: number | null;
	setTargetComment: (comment: COMMENT_DTO) => void;
}

function CommentsView({
	comment,
	show,
	setCommentId,
	commentId,
	setTargetComment,
}: CommentsViewProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			<Comment
				comment={comment}
				show={show}
				setCommentId={setCommentId}
				selectedCommentId={commentId}
				setTargetComment={setTargetComment}
			/>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 20,
		},
		recommntContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			paddingTop: 15,
			marginLeft: 10,
		},
	});

export default CommentsView;
