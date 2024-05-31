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
	TouchableOpacity,
	View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Comment from '../../assets/images/Comment.png';
import Report from '../../assets/images/Report.png';
import Send from '../../assets/images/Send.png';

type CommunityQuestionDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
};
const testImg =
	'https://images.unsplash.com/photo-1605100958409-e084833953d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuYWxvZ3xlbnwwfHwwfHx8MA%3D%3D';

const CommunityQuestionDetailScreen = ({
	route,
}: CommunityQuestionDetailScreenProps) => {
	const Stack = createStackNavigator<CommunityStackParamList>();
	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={styles.rowGap10}>
						<Image source={{ uri: testImg }} style={styles.userImg} />
						<View style={styles.questionInfoLayout}>
							<Text style={styles.username}>Sunny Kim</Text>
							<View style={styles.rowGap10}>
								<View style={styles.rowGap5}>
									<IonIcons name="calendar" color={colors[theme].GRAY_500} />
									<Text style={styles.questionInfo}>2024/07/07</Text>
								</View>
								<View style={styles.rowGap5}>
									<Octicons name="clock" color={colors[theme].GRAY_500} />
									<Text style={styles.questionInfo}>13:22</Text>
								</View>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => console.log('click')}
						>
							<Image source={Report} style={styles.report} />
						</TouchableOpacity>
					</View>

					<View style={styles.contents}>
						<View style={styles.titleLayout}>
							<Text style={styles.title}>
								잠실에서 모임 열건데 추천 맛집있나요?
							</Text>
						</View>
						<Text style={styles.content}>
							이번주에 잠실에서 만나려고 하는데요, 일단 저 포함 3명이고, 한국인
							2명 있어요.
						</Text>
					</View>

					<TouchableOpacity
						style={[styles.rowGap10, styles.bottom]}
						activeOpacity={0.8}
						onPress={() => console.log('click')}
					>
						<View style={styles.translationLayout}>
							<MaterialIcons name="translate" color={colors[theme].WHITE} />
						</View>
						<Text>번역하기</Text>
					</TouchableOpacity>
					<View style={styles.verticalLine} />
					<View style={[styles.rowGap10, styles.bottom]}>
						<Image source={Comment} />
						<Text>3</Text>
					</View>
					<View style={styles.verticalLine} />
				</ScrollView>

				<View style={styles.inputContainer}>
					<View style={[styles.rowGap5, styles.anonymousContainer]}>
						<Text>체크</Text>
						<Text>익명</Text>
					</View>
					<View style={[styles.rowGap10]}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => console.log('click')}
						>
							<IonIcons
								name="camera-outline"
								color={colors[theme].GRAY_500}
								size={25}
							/>
						</TouchableOpacity>
						<View style={[styles.rowGap5, styles.inputLayout]}>
							<TextInput placeholder="댓글을 입력하세요" style={styles.input} />
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => console.log('click')}
							>
								<Image source={Send} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			gap: 10,
			flex: 1,
			padding: 20,
		},
		userImg: {
			width: 30,
			height: 30,
			borderRadius: 500,
			backgroundColor: colors[theme].GRAY_300,
		},
		username: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		questionInfo: {
			color: colors[theme].GRAY_700,
			fontSize: 10,
		},
		rowGap10: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		rowGap5: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			alignItems: 'center',
		},
		report: {
			width: 14,
			height: 11,
			alignSelf: 'center',
		},
		questionInfoLayout: {
			flex: 1,
		},
		content: {
			paddingHorizontal: 10,
			marginBottom: 40,
			fontSize: 14,
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Regular',
		},
		title: {
			fontSize: 14,
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
		},
		titleLayout: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			borderRadius: 15,
			backgroundColor: colors[theme].GRAY_100,
		},
		contents: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		verticalLine: {
			width: '95%',
			alignSelf: 'center',
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GRAY_400,
		},
		translationLayout: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 16,
			height: 16,
			backgroundColor: colors[theme].GRAY_500,
			borderRadius: 3,
		},
		bottom: {
			paddingHorizontal: 10,
		},
		inputContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			width: '100%',
			padding: 20,
			backgroundColor: colors[theme].GRAY_100,
		},
		anonymousContainer: {
			marginLeft: 'auto',
		},
		inputLayout: {
			flex: 1,
			padding: 10,
			borderRadius: 10,
			backgroundColor: colors[theme].WHITE,
		},
		input: {
			flex: 1,
			height: 20,
		},
	});

export default CommunityQuestionDetailScreen;
