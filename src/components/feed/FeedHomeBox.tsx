import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface FeedHomeBoxProps {
	text1?: string;
	text2?: string;
	highlightText?: string;
}

const FeedHomeBox = ({ text1, text2, highlightText }: FeedHomeBoxProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.box}>
			<View style={styles.boxTop}>
				<Text style={styles.text}>{text1}</Text>
				<Text style={styles.text}>
					<Text style={styles.highlightText}>{highlightText}</Text> {text2}
				</Text>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.boxBottom,
					pressed ? styles.filledPressed : styles.filled,
				]}
			>
				<Ionicons
					style={styles.boxIcon}
					name="chevron-forward"
					size={25}
					color={colors[theme].BLACK}
				/>
			</Pressable>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		box: {
			width: '80%',
			height: 150,
			borderWidth: 2,
			borderRadius: 20,
			borderColor: colors[theme].EMERALD_500,
			flexDirection: 'column',
			justifyContent: 'center',
		},
		boxTop: {
			marginLeft: 10,
			height: '60%',
			alignItems: 'flex-start',
			justifyContent: 'center',
		},
		text: {
			fontSize: 15,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Light',
		},
		highlightText: {
			fontWeight: '900',
			fontSize: 20,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Bold',
		},
		boxBottom: {
			position: 'relative',
			height: '40%',
			borderBottomEndRadius: 20,
			borderBottomStartRadius: 20,
		},
		boxIcon: {
			position: 'absolute',
			right: 0,
			top: 15,
		},
		filledPressed: {
			backgroundColor: colors[theme].WHITE,
		},
		filled: {
			backgroundColor: colors[theme].GRAY_100,
		},
	});

export default FeedHomeBox;
