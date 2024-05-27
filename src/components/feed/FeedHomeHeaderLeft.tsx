import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface FeedHomeHeaderLeftProps {}

const FeedHomeHeaderLeft = ({}: FeedHomeHeaderLeftProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<Image
				width={20}
				height={20}
				source={require('@/assets/Logo.png')}
				resizeMode="contain"
			/>
			<Text style={styles.text}>elting Pot</Text>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 10,
		},
		text: {
			marginLeft: 5,
			fontSize: 20,
			fontFamily: 'Pretendard-Bold',
			color: colors[theme].BLACK,
		},
	});

export default FeedHomeHeaderLeft;
