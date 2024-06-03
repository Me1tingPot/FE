import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '@/components/common/CustomButton';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import SignUpFinishImage from '../../assets/images/InThePot.png';
import { AuthHomeScreenProps } from './AuthHomeScreen';

const backgroundGradientColor = [
	'#FFFFFF',
	'#E6FFF0',
	'#DCFFEA',
	'#C5FFDD',
	'#B1FFE9',
	'#D3FFF5',
];

const SignUpFinishScreen = ({ navigation }: AuthHomeScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={backgroundGradientColor}
				style={styles.gradientContainer}
			>
				<ScrollView contentContainerStyle={styles.imageLayout}>
					<Image source={SignUpFinishImage} style={styles.image} />
					<Text style={styles.title}>멜팅팟에 오신 것을 환영합니다!</Text>
					<Text style={styles.description}>
						로그인하고 멜팅팟을 시작하세요!
					</Text>
				</ScrollView>
				<CustomButton
					label="시작하기"
					variant={'filled'}
					onPress={() => navigation.navigate('Login')}
				/>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			backgroundColor: colors[theme].UNCHANGE_WHITE,
		},
		contentsContainer: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		gradientContainer: {
			flex: 1,
			paddingVertical: 50,
			paddingHorizontal: 40,
			justifyContent: 'center',
			alignItems: 'center',
		},
		imageLayout: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 50,
		},
		image: {
			width: 320,
			height: 300,
		},
		title: {
			fontSize: 25,
			color: colors[theme].UNCHANGE_BLACK,
			fontFamily: 'Pretendard-Light',
		},
		description: {
			fontSize: 14,
			color: colors[theme].UNCHANGE_BLACK,
			fontFamily: 'Pretendard-Regular',
			marginTop: 5,
		},
	});

export default SignUpFinishScreen;
