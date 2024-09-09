import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { COMMENT_DTO } from '@/types/api/types';
import Comment from './Comment';

interface CommentsViewProps {
	comment: COMMENT_DTO;
}

function CommentsView({ comment }: CommentsViewProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View>
			<Comment
				name={comment.name}
				postDate={comment.updatedAt}
				content={comment.content}
				userImg={comment.imageUrl}
			/>
			{/* {new Array(3).fill(null).map((_, idx) => (
				<View style={styles.recommntContainer} key={idx}>
					<MaterialIcons
						name="subdirectory-arrow-right"
						color={colors[theme].BLACK}
					/>
					<Comment />
				</View>
			))} */}
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		recommntContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			paddingTop: 15,
			marginLeft: 10,
		},
	});

export default CommentsView;
