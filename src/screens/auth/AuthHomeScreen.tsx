import { useTranslation } from 'react-i18next';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations, colors } from '@/constants';
import useModal from '@/hooks/useModal';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

/** *
 * Screen Typing
 * Navigator에서 정의한 ParamList를 타입으로 전달, 조금 더 명확히 하기 위해서 스크린 명까지 전달.
 */
export type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

const colorList = {
	bgColor: ['#FFFFFF', '#E6FFF0', '#DCFFEA', '#C5FFDD', '#B1FFE9', '#D3FFF5'],
	redCircle: ['#FF3666', '#FF4F6E', '#D67DFF'],
	greenCircle: ['#DCFFEA', '#C5FFDD', '#A5F2E1'],
};

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const modal = useModal();
	const { t } = useTranslation();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={colors[theme].UNCHANGE_WHITE}
			/>
			<LinearGradient
				style={styles.backgroundContainer}
				colors={colorList.bgColor}
			>
				<LinearGradient colors={colorList.redCircle} style={styles.redCircle} />
				<LinearGradient
					colors={colorList.greenCircle}
					style={styles.greenCircle}
				/>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Text style={styles.title}>{t('멜팅팟에 오신 걸 환영합니다!')}</Text>
					<View style={styles.buttonContainer}>
						<CustomButton
							label={t('로그인 화면으로 이동')}
							onPress={() => navigation.navigate(authNavigations.LOGIN)}
						/>
						<CustomButton
							label={t('회원가입 화면으로 이동')}
							onPress={() => navigation.navigate(authNavigations.SIGN_UP)}
						/>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].UNCHANGE_WHITE,
		},
		contentContainer: {
			flex: 1,
			paddingHorizontal: 10,
			paddingVertical: 30,
			justifyContent: 'center',
			alignItems: 'center',
		},
		redCircle: {
			width: 400,
			height: 400,
			position: 'absolute',
			borderRadius: 500,
			bottom: -130,
			right: 120,
			opacity: 0.8,
		},
		greenCircle: {
			width: 400,
			height: 400,
			position: 'absolute',
			borderRadius: 500,
			bottom: -80,
			left: 140,
		},
		backgroundContainer: {
			flex: 1,
			padding: 30,
			justifyContent: 'center',
			alignItems: 'center',
		},
		buttonContainer: {
			marginTop: 'auto',
			gap: 10,
		},
		title: {
			flex: 1,
			fontSize: 25,
			color: colors[theme].UNCHANGE_BLACK,
			fontFamily: 'Pretendard-Light',
			marginTop: 90,
		},
	});

export default AuthHomeScreen;
