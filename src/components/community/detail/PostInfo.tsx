import { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateLocaleFormat, getFormattedTime } from '@/utils';
import Report from '../../../assets/images/Report.png';

interface PostInfoProps {
	writerName?: string;
	postDate?: string;
	show: () => void;
}

const testImg =
	'https://images.unsplash.com/photo-1605100958409-e084833953d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuYWxvZ3xlbnwwfHwwfHx8MA%3D%3D';

function PostInfo({ writerName, postDate, show }: PostInfoProps) {
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
		<View style={styles.rowGap10}>
			<Image source={{ uri: testImg }} style={styles.userImg} />
			<View style={styles.questionInfoLayout}>
				<Text style={styles.username}>{writerName}</Text>
				<View style={styles.rowGap10}>
					<View style={styles.rowGap5}>
						<IonIcons name="calendar" color={colors[theme].GRAY_500} />
						<Text style={styles.questionInfo}>{date}</Text>
					</View>
					<View style={styles.rowGap5}>
						<Octicons name="clock" color={colors[theme].GRAY_500} />
						<Text style={styles.questionInfo}>{time}</Text>
					</View>
				</View>
			</View>
			<TouchableOpacity activeOpacity={0.8} onPress={show}>
				<IonIcons name="ellipsis-vertical" color="#000" size={20} />
			</TouchableOpacity>
		</View>
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
		userImg: {
			width: 30,
			height: 30,
			borderRadius: 500,
			backgroundColor: colors[theme].GRAY_300,
		},
		questionInfoLayout: {
			flex: 1,
		},
		username: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		rowGap5: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			alignItems: 'center',
		},
		questionInfo: {
			color: colors[theme].GRAY_700,
			fontSize: 10,
		},
		report: {
			width: 14,
			height: 11,
			alignSelf: 'center',
		},
	});

export default PostInfo;
