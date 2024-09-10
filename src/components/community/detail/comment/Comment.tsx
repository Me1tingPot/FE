import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateLocaleFormat, getFormattedTime } from '@/utils';

interface CommentProps {
	name?: string;
	postDate?: string;
	content?: string;
	userImg?: string;
}

function Comment({ name, postDate, content, userImg }: CommentProps) {
	const [date, setDate] = useState(getDateLocaleFormat(new Date()));
	const [time, setTime] = useState(getFormattedTime(new Date()));
	const { theme } = useThemeStore();
	const styles = styling(theme);

	useEffect(() => {
		if (postDate) {
			setDate(getDateLocaleFormat(postDate));
			setTime(getFormattedTime(postDate));
		}
	}, [postDate]);

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
					<Text style={styles.comment}>{name}</Text>
					<Text style={styles.infoText}>
						{date} {time}
					</Text>
				</View>
			</View>
			<View style={styles.commentLayout}>
				<Text style={styles.comment}>{content}</Text>
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
			color: colors[theme].GRAY_500,
			fontSize: 11,
		},
		comment: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		verticalLine: {
			width: '95%',
			alignSelf: 'center',
		},
	});

export default Comment;
