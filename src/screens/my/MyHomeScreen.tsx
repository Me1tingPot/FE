import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ChangeLanguageOption from '@/components/my/ChangeLanguageOption';
import DarkModeOption from '@/components/my/DarkModeOption';
import ProfileContainer from '@/components/my/ProfileContainer';
import SettingItem from '@/components/my/SettingItem';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import useThemeStorage from '@/hooks/useThemeStorage';
import i18n from '@/locales/i18n.config';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface MyHomeScreenProps {}

function MyHomeScreen({}: MyHomeScreenProps) {
	const { t } = useTranslation();
	const darkModeOption = useModal();
	const changeLanguageOption = useModal();
	const { theme: themeMode, isSystem } = useThemeStorage();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const whichLanguage = i18n.language === 'ko' ? t('한국어') : t('영어');
	const isDarkOrSystem =
		isSystem === true
			? t('시스템 기본값')
			: themeMode === 'light'
				? t('라이트 모드')
				: t('다크 모드');

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.contentContainer}
			>
				{/* TODO:Profile Data 전달 */}
				<ProfileContainer />
				{/* TODO:기획 완료시, 페이지 연결 */}
				<View style={styles.section}>
					<Text style={styles.categoryText}>{t('계정')}</Text>
					<SettingItem title={t('아이디')} subTitle="dydals3440" />
					<SettingItem title={t('비밀번호 변경')} />
					<SettingItem title={t('이메일 변경')} />
				</View>
				<View style={styles.space} />
				<View style={styles.section}>
					<Text style={styles.categoryText}>{t('커뮤니티')}</Text>
					<SettingItem title={t('이용 제한 내역')} />
					<SettingItem title={t('채팅 설정')} />
					<SettingItem title={t('커뮤니티 이용규칙')} />
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
					<SettingItem title={t('알림 설정')} />
				</View>
				<View style={styles.space} />
				<View style={styles.section}>
					<Text style={styles.categoryText}>{t('이용 안내')}</Text>
					<SettingItem title={t('앱 버전')} />
					<SettingItem title={t('문의 하기')} />
					<SettingItem title={t('공지사항')} />
					<SettingItem title={t('서비스 이용약관')} />
					<SettingItem title={t('오픈소스 라이선스')} />
				</View>
				<View style={styles.space} />
				<View style={styles.section}>
					<Text style={styles.categoryText}>{t('기타')}</Text>
					<SettingItem title={t('정보 동의 설정')} />
					<SettingItem title={t('회원 탈퇴')} />
					<SettingItem title={t('로그아웃')} />
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
		},
		contentContainer: {
			paddingHorizontal: 15,
			flex: 1,
		},
		section: {
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
