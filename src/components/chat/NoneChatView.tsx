import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import NoneChat from '../../assets/images/NoneChat.png';
import CustomButton from '../common/CustomButton';

interface NoneChatViewProps {
	navigation: NavigationProp<FeedStackParamList>;
}

const NoneChatView = ({ navigation }: NoneChatViewProps) => {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text
					style={styles.title}
				>{`${t('아직 참여 중인 채팅 방이 없습니다.')}`}</Text>
				<Text style={styles.description}>{`${t('파티에 참여하고')}`}</Text>
				<Text
					style={styles.description}
				>{`${t('실시간 채팅을 받아보세요.')}`}</Text>
			</View>

			<Image source={NoneChat} />
			<View style={{ marginTop: 'auto' }}>
				<CustomButton
					label={`${t('내 주변 파티 둘러보기')}`}
					onPress={() => navigation.navigate(feedNavigations.FEED_TAB)}
				/>
			</View>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			paddingVertical: 50,
		},
		title: {
			fontFamily: 'Pretendard-Light',
			color: colors[theme].BLACK,
			fontSize: 25,
			marginBottom: 10,
		},
		description: {
			fontFamily: 'Pretendard-Light',
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		textContainer: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginVertical: 30,
		},
	});

export default NoneChatView;
