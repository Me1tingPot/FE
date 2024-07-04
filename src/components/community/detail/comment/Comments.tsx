import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { colors, communityNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CommentImg from '../../../../assets/images/Comment.png';
import CommentsView from './CommentsView';

interface CommentsProps {
	navigation: NavigationProp<CommunityStackParamList>;
	id: number;
}

function Comments({ navigation, id }: CommentsProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<>
			<TouchableOpacity
				activeOpacity={0.8}
				style={[styles.rowGap10, styles.bottom]}
				onPress={() =>
					navigation.navigate(communityNavigations.COMMUNITY_COMMENTS, { id })
				}
			>
				<Image source={CommentImg} />
				<Text style={styles.commentCount}>3</Text>
			</TouchableOpacity>
			<View style={styles.verticalLine} />
			<View style={styles.commentLayout}>
				{new Array(3).fill(null).map((_, idx) => (
					<CommentsView key={idx} />
				))}
			</View>
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
