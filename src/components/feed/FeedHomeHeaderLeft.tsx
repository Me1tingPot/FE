import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface FeedHomeHeaderLeftProps {}

const FeedHomeHeaderLeft = ({}: FeedHomeHeaderLeftProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	// require은 동적으로 경로를 세팅 x
	const logoSource =
		theme === 'dark'
			? require('@/assets/images/white_logo_title.png')
			: require('@/assets/images/black_logo_title.png');

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={logoSource} resizeMode="contain" />
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
		logo: {
			width: 130,
			height: 130,
		},
	});

export default FeedHomeHeaderLeft;
