import { useTranslation } from 'react-i18next';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import CustomButton from '@/components/common/CustomButton';
import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import ChatStart from '../../assets/images/ChatStart.png';

interface ChatStartScreenProps {
	navigation: NavigationProp<FeedStackParamList>;
}

function ChatStartScreen({ navigation }: ChatStartScreenProps) {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const colorList = ['#FFFFFF', '#C6FFF3'];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<LinearGradient colors={colorList} style={styles.backgroundContainer}>
					<View style={styles.contentsContainer}>
						<Text
							style={styles.title}
						>{`${t('채팅에 오신 것을 환영합니다!')}`}</Text>
						<Text style={styles.description}>{`${t('파티에 참여하고')}`}</Text>
						<Text
							style={styles.description}
						>{`${t('실시간 채팅을 받아보세요.')}`}</Text>
						<Image source={ChatStart} style={styles.imageLayout} />
					</View>

					<View style={styles.buttonLayout}>
						<CustomButton
							label={`${t('채팅하러 가기')}`}
							onPress={() => navigation.navigate(feedNavigations.CHAT_HOME)}
						/>
					</View>
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		backgroundContainer: {
			flex: 1,
			padding: 30,
			justifyContent: 'center',
			alignItems: 'center',
		},
		title: {
			fontFamily: 'Pretendard-Light',
			fontSize: 25,
			marginBottom: 10,
			color: colors[theme].UNCHANGE_BLACK,
		},
		description: {
			fontFamily: 'Pretendard-Light',
			fontSize: 14,
			color: colors[theme].UNCHANGE_BLACK,
		},
		contentsContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		imageLayout: {
			marginTop: 20,
		},
		buttonLayout: {
			marginTop: 'auto',
		},
	});

export default ChatStartScreen;
