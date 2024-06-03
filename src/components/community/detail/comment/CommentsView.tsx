import { StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Comment from './Comment';

const CommentsView = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View>
			<Comment />
			{new Array(3).fill(null).map((_, idx) => (
				<View style={styles.recommntContainer} key={idx}>
					<MaterialIcons
						name="subdirectory-arrow-right"
						color={colors[theme].BLACK}
					/>
					<Comment />
				</View>
			))}
		</View>
	);
};

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
