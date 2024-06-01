import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const userImage =
	'https://images.unsplash.com/photo-1716339140080-be256d3270ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8';

interface AlertBoxProps {
	onPress?: () => void;
}

const AlertBox = ({ onPress }: AlertBoxProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<Image source={{ uri: userImage }} style={styles.userImage} />
			<View style={styles.contentContainer}>
				<Text style={styles.username}>Stephan Louis</Text>
				<Text style={styles.alertMessage}>
					당신의 포스팅에 댓글을 남겼습니다.
				</Text>
				<Text style={styles.time}>10:04 AM</Text>
			</View>
			<Image source={{ uri: userImage }} style={styles.image} />
		</TouchableOpacity>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'row',
			gap: 15,
			alignItems: 'center',
			paddingVertical: 20,
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GRAY_200,
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 3,
			flex: 1,
		},
		userImage: {
			width: 33,
			height: 33,
			borderRadius: 500,
			backgroundColor: colors[theme].GRAY_300,
		},
		username: {
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
			fontSize: 14,
		},
		alertMessage: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		time: {
			color: colors[theme].GRAY_700,
			fontSize: 14,
			fontFamily: 'Pretendard-Light',
		},
		image: {
			width: 55,
			height: 55,
			borderRadius: 10,
		},
	});

export default AlertBox;
