import { useTranslation } from 'react-i18next';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { colors, myNavigations } from '@/constants';
import MyEditProfileScreen from '@/screens/my/MyEditProfileScreen';
import MyHomeScreen from '@/screens/my/MyHomeScreen';
import MyProfileImageEditScreen from '@/screens/my/MyProfileImageEditScreen';
import MyWritePostScreen from '@/screens/my/MyWritePostScreen';
import AlertSettingScreen from '@/screens/my/app/AlertSettingScreen';
import ChattingSettingScreen from '@/screens/my/community/ChattingSettingScreen';
import CommunityRulesScreen from '@/screens/my/community/CommunityRulesScreen';
import UsingRestrictScreen from '@/screens/my/community/UsingRestrictScreen';
import InfoAgreeSettingScreen from '@/screens/my/etc/InfoAgreeSettingScreen';
import AppVersionScreen from '@/screens/my/info/AppVersionScreen';
import NoticeScreen from '@/screens/my/info/NoticeScreen';
import QuestionScreen from '@/screens/my/info/QuestionScreen';
import ServiceUsingScreen from '@/screens/my/info/ServiceUsingScreen';
import PasswordChangeScreen from '@/screens/my/user/PasswordChangeScreen';
import useThemeStore from '@/store/useThemeStore';

export type MyStackParamList = {
	[myNavigations.MY_PAGE_HOME]: undefined;
	[myNavigations.EDIT_PROFILE]: undefined;
	[myNavigations.MY_WRITE_POST]: undefined;
	[myNavigations.MY_PROFILE_IMAGE_EDIT]: undefined;
	[myNavigations.PASSWORD_CHANGE]: undefined;
	[myNavigations.USING_RESTRICT]: undefined;
	[myNavigations.CHATTING_SETTING]: undefined;
	[myNavigations.COMMUNITY_RULES]: undefined;
	[myNavigations.ALERT_SETTING]: undefined;
	[myNavigations.APP_VERSION]: undefined;
	[myNavigations.QUESTION]: undefined;
	[myNavigations.NOTICE]: undefined;
	[myNavigations.SERVICE_USING]: undefined;
	[myNavigations.INFO_AGREE_SETTING]: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

function MyStackNavigator() {
	const { t } = useTranslation();
	const { theme } = useThemeStore();

	const commonHeaderOptions: StackNavigationOptions = {
		headerTitleAlign: 'center',
		headerBackTitleVisible: false,
		headerShadowVisible: false,
		headerStyle: {
			backgroundColor: colors[theme].WHITE,
		},
		headerTitleStyle: {
			color: colors[theme].BLACK,
		},
		headerTintColor: colors[theme].BLACK,
	};

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: colors[theme].WHITE,
				},
				headerStyle: {
					shadowColor: colors[theme].GRAY_200,
					backgroundColor: colors[theme].WHITE,
				},
				headerTitleStyle: {
					fontSize: 20,
				},
				headerTintColor: colors[theme].GRAY_700,
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen
				name={myNavigations.MY_PAGE_HOME}
				component={MyHomeScreen}
				options={{
					headerShown: true,
					headerTitle: `${t('마이페이지')}`,
				}}
			/>
			<Stack.Screen
				name={myNavigations.EDIT_PROFILE}
				component={MyEditProfileScreen}
				options={{
					headerTitle: `${t('프로필 수정')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={myNavigations.MY_WRITE_POST}
				component={MyWritePostScreen}
				options={{
					headerTitle: `${t('내가 쓴 글')}`,
					cardStyle: {
						backgroundColor: colors[theme].WHITE,
					},
				}}
			/>
			<Stack.Screen
				name={myNavigations.MY_PROFILE_IMAGE_EDIT}
				component={MyProfileImageEditScreen}
				options={{ headerTitle: `${t('프로필 사진')}`, ...commonHeaderOptions }}
			/>
			<Stack.Screen
				name={myNavigations.PASSWORD_CHANGE}
				component={PasswordChangeScreen}
				options={{
					headerTitle: `${t('비밀번호 변경')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={myNavigations.USING_RESTRICT}
				component={UsingRestrictScreen}
				options={{
					headerTitle: `${t('이용 제한 내역')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={myNavigations.CHATTING_SETTING}
				component={ChattingSettingScreen}
				options={{ headerTitle: `${t('채팅 설정')}`, ...commonHeaderOptions }}
			/>
			<Stack.Screen
				name={myNavigations.COMMUNITY_RULES}
				component={CommunityRulesScreen}
				options={{
					headerTitle: `${t('커뮤니티 이용규칙')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={myNavigations.ALERT_SETTING}
				component={AlertSettingScreen}
				options={{ headerTitle: `${t('알림 설정')}`, ...commonHeaderOptions }}
			/>
			<Stack.Screen
				name={myNavigations.APP_VERSION}
				component={AppVersionScreen}
				options={{ headerTitle: `${t('앱 버전')}`, ...commonHeaderOptions }}
			/>
			<Stack.Screen
				name={myNavigations.QUESTION}
				component={QuestionScreen}
				options={{ headerTitle: `${t('문의 하기')}`, ...commonHeaderOptions }}
			/>
			<Stack.Screen
				name={myNavigations.NOTICE}
				component={NoticeScreen}
				options={{ headerTitle: `${t('공지사항')}`, ...commonHeaderOptions }}
			/>
			<Stack.Screen
				name={myNavigations.SERVICE_USING}
				component={ServiceUsingScreen}
				options={{
					headerTitle: `${t('서비스 이용약관')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={myNavigations.INFO_AGREE_SETTING}
				component={InfoAgreeSettingScreen}
				options={{
					headerTitle: `${t('정보 동의 설정')}`,
					...commonHeaderOptions,
				}}
			/>
		</Stack.Navigator>
	);
}

export default MyStackNavigator;
