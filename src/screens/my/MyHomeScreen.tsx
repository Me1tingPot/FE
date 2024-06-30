import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import ChangeLanguageOption from '@/components/my/ChangeLanguageOption';
import DarkModeOption from '@/components/my/DarkModeOption';
import ProfileContainer from '@/components/my/ProfileContainer';
import SettingItem from '@/components/my/SettingItem';
import { colors, myNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useGetUserData from '@/hooks/useGetUserData';
import useModal from '@/hooks/useModal';
import useThemeStorage from '@/hooks/useThemeStorage';
import i18n from '@/locales/i18n.config';
import { MyStackParamList } from '@/navigations/stack/MyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface MyHomeScreenProps {
	navigation: NavigationProp<MyStackParamList>;
}

function MyHomeScreen({ navigation }: MyHomeScreenProps) {
	const { t } = useTranslation();
	const darkModeOption = useModal();
	const changeLanguageOption = useModal();
	const { theme: themeMode, isSystem } = useThemeStorage();
	const { theme } = useThemeStore();
	const { email } = useGetUserData();
	const styles = styling(theme);
	const whichLanguage = i18n.language === 'ko' ? t('한국어') : t('영어');
	const isDarkOrSystem =
		isSystem === true
			? t('시스템 기본값')
			: themeMode === 'light'
				? t('라이트 모드')
				: t('다크 모드');

	const { logoutMutation } = useAuth();

	const handlePressLogout = () => {
		logoutMutation.mutate(null);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.contentContainer}
			>
				<ProfileContainer />
				{/* TODO:기획 완료시, 페이지 연결 */}
				<View style={styles.menuContainer}>
					<View style={styles.section}>
						<Text style={styles.categoryText}>{t('계정')}</Text>
						<SettingItem title={t('이메일')} subTitle={email} />
						<SettingItem
							title={t('비밀번호 변경')}
							onPress={() => navigation.navigate(myNavigations.PASSWORD_CHANGE)}
						/>
					</View>
					<View style={styles.space} />
					<View style={styles.section}>
						<Text style={styles.categoryText}>{t('커뮤니티')}</Text>
						<SettingItem
							title={t('이용 제한 내역')}
							onPress={() => navigation.navigate(myNavigations.USING_RESTRICT)}
						/>
						<SettingItem
							title={t('채팅 설정')}
							onPress={() =>
								navigation.navigate(myNavigations.CHATTING_SETTING)
							}
						/>
						<SettingItem
							title={t('커뮤니티 이용규칙')}
							onPress={() => navigation.navigate(myNavigations.COMMUNITY_RULES)}
						/>
					</View>
					<View style={styles.space} />
					<View style={styles.section}>
						<Text style={styles.categoryText}>{t('앱 설정')}</Text>
						<SettingItem
							title={t('다크 모드')}
							onPress={darkModeOption.show}
							subTitle={isDarkOrSystem}
						/>
						<SettingItem
							title={t('언어 변경')}
							subTitle={whichLanguage}
							onPress={changeLanguageOption.show}
						/>
						<SettingItem
							title={t('알림 설정')}
							onPress={() => navigation.navigate(myNavigations.ALERT_SETTING)}
						/>
					</View>
					<View style={styles.space} />
					<View style={styles.section}>
						<Text style={styles.categoryText}>{t('이용 안내')}</Text>
						<SettingItem
							title={t('앱 버전')}
							onPress={() => navigation.navigate(myNavigations.APP_VERSION)}
						/>
						<SettingItem
							title={t('문의 하기')}
							onPress={() => navigation.navigate(myNavigations.QUESTION)}
						/>
						<SettingItem
							title={t('공지사항')}
							onPress={() => navigation.navigate(myNavigations.NOTICE)}
						/>
						<SettingItem
							title={t('서비스 이용약관')}
							onPress={() => navigation.navigate(myNavigations.SERVICE_USING)}
						/>
					</View>
					<View style={styles.space} />
					<View style={styles.section}>
						<Text style={styles.categoryText}>{t('기타')}</Text>
						<SettingItem
							title={t('정보 동의 설정')}
							onPress={() =>
								navigation.navigate(myNavigations.INFO_AGREE_SETTING)
							}
						/>
						<SettingItem title={t('회원 탈퇴')} />
						<SettingItem title={t('로그아웃')} onPress={handlePressLogout} />
					</View>
				</View>

				<DarkModeOption
					isVisible={darkModeOption.isVisible}
					hideOption={darkModeOption.hide}
				/>
				<ChangeLanguageOption
					isVisible={changeLanguageOption.isVisible}
					hideOption={changeLanguageOption.hide}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].GRAY_100,
		},
		contentContainer: {
			flex: 1,
		},
		menuContainer: {
			paddingTop: 45,
			backgroundColor: colors[theme].WHITE,
			borderTopLeftRadius: 60,
			borderTopRightRadius: 60,
		},
		section: {
			paddingHorizontal: 20,
			flexDirection: 'column',
		},
		categoryText: {
			fontSize: 25,
			fontFamily: 'Pretendard-Bold',
			paddingHorizontal: 10,
			marginBottom: 10,
			color: colors[theme].BLACK,
		},
		space: {
			height: 30,
		},
	});

export default MyHomeScreen;
