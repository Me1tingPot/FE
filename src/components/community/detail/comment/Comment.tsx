import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const userImg = '';

function Comment() {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<View style={styles.commentTop}>
				{userImg ? (
					<Image source={{ uri: userImg }} style={styles.user} />
				) : (
					<View style={styles.user}>
						<Ionicons
							name="person-sharp"
							color={colors[theme].GRAY_300}
							size={20}
						/>
					</View>
				)}
				<View style={styles.userInfo}>
					<Text style={styles.comment}>익명</Text>
					<Text style={styles.infoText}>2024/07/07 13:22</Text>
				</View>
			</View>
			<View style={styles.commentLayout}>
				<Text style={styles.comment}>Comment</Text>
			</View>
			<View style={styles.verticalLine} />
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			flex: 1,
		},
		commentTop: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		userInfo: {
			display: 'flex',
			flexDirection: 'column',
			gap: 5,
		},
		commentLayout: {
			marginLeft: 40,
		},
		user: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 30,
			height: 30,
			borderRadius: 500,
			backgroundColor: colors[theme].GRAY_100,
		},
		infoText: {
			color: colors[theme].GRAY_700,
			fontSize: 12,
		},
		comment: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		verticalLine: {
			width: '95%',
			alignSelf: 'center',
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GRAY_300,
		},
	});

export default Comment;
