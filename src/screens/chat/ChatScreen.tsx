import { useTranslation } from 'react-i18next';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { colors } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import BoldSend from '../../assets/images/BoldSend.png';

interface ChatScreenProps {
	route: {
		params: {
			id: number;
		};
	};
	navigation: NavigationProp<FeedStackParamList>;
}

const imgUrl =
	'https://images.unsplash.com/photo-1717097410161-aa16fb3ceb3f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8';

function ChatScreen({ route, navigation }: ChatScreenProps) {
	const { t } = useTranslation();
	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyboardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 15}
			>
				<View style={styles.headerContainer}>
					<Pressable onPress={() => navigation.goBack()}>
						<Ionicons
							name="chevron-back-outline"
							size={30}
							style={styles.headerImage}
							color={colors[theme].BLACK}
						/>
					</Pressable>
					<Image source={{ uri: imgUrl }} style={styles.headerImage} />
					<View>
						<Text style={styles.headerTitle}>연대 축제팟</Text>
						<View
							style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
						>
							<View style={styles.headerCircle}></View>
							<Text style={styles.memberCount}>5</Text>
						</View>
					</View>
				</View>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					{new Array(10).fill(null).map((_, idx) => (
						<View key={idx}>
							<View>
								<View style={styles.rightChatLayout}>
									<View style={styles.leftChat}>
										<Text>내일 몇 시에 어디서 만나나요?</Text>
									</View>
								</View>
							</View>

							<View>
								<Text style={styles.name}>Sunny Kim</Text>
								<View style={styles.leftChatLayout}>
									<Image source={{ uri: imgUrl }} style={styles.userImg} />
									<View style={styles.rightChat}>
										<Text style={styles.chatText}>
											홍대입구역 3번 출구에서 만나요!
										</Text>
									</View>
								</View>
							</View>
						</View>
					))}
				</ScrollView>
				<View style={styles.chatInputContainer}>
					<View style={styles.inputContaner}>
						<TextInput
							placeholder={`${t('채팅을 입력해주세요')}`}
							style={styles.input}
							placeholderTextColor={colors[theme].BLACK}
						/>
						<Image source={BoldSend} />
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		keyboardView: {
			flex: 1,
		},
		contentContainer: {
			padding: 30,
			gap: 20,
		},
		leftChat: {
			marginLeft: 'auto',
			padding: 20,
			backgroundColor: colors[theme].EMERALD_500,
			borderTopLeftRadius: 100,
			borderBottomLeftRadius: 100,
			borderBottomRightRadius: Platform.OS === 'ios' ? 30 : 90,
		},
		rightChat: {
			padding: 20,
			backgroundColor: colors[theme].GRAY_100,
			borderTopRightRadius: 100,
			borderBottomRightRadius: 100,
			borderBottomLeftRadius: Platform.OS === 'ios' ? 30 : 90,
			marginRight: 40,
		},
		chatText: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		chatInputContainer: {
			display: 'flex',
			flexDirection: 'row',
			padding: 20,
			backgroundColor: colors[theme].GRAY_100,
		},
		inputContaner: {
			display: 'flex',
			flexDirection: 'row',
			gap: 1,
			flex: 1,
			alignItems: 'center',
			padding: 15,
			borderRadius: 300,
			backgroundColor: colors[theme].WHITE,
		},
		input: {
			flex: 1,
			padding: Platform.OS === 'android' ? 0 : 5,
		},
		leftChatLayout: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
		},
		rightChatLayout: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			marginLeft: 'auto',
		},
		userImg: {
			width: 30,
			height: 30,
			borderRadius: 300,
			backgroundColor: colors[theme].GRAY_300,
		},
		name: {
			color: colors[theme].GRAY_700,
			fontSize: 12,
			marginBottom: 10,
		},
		headerContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			paddingVertical: 15,
		},
		headerImage: {
			width: 45,
			height: 45,
			borderRadius: 300,
		},
		headerTitle: {
			color: colors[theme].BLACK,
			fontSize: 18,
			fontFamily: 'Pretendard-Light',
		},
		headerCircle: {
			width: 5,
			height: 5,
			backgroundColor: colors[theme].EMERALD_500,
			borderRadius: 300,
		},
		memberCount: {
			color: colors[theme].EMERALD_500,
		},
	});

export default ChatScreen;
