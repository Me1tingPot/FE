import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import ChangeNameModal from '@/components/my/ChangeNameModal';
import ChangeProfileModal from '@/components/my/ChangeProfileModal';
import ChangeRevokeModal from '@/components/my/ChangeRevokeModal';
import { colors, myNavigations } from '@/constants';
import useModal from '@/hooks/useModal';
import { MyStackParamList } from '@/navigations/stack/MyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface MyEditProfileScreenProps {
	navigation: NavigationProp<MyStackParamList>;
}

const userImg = '';

const MyEditProfileScreen = ({ navigation }: MyEditProfileScreenProps) => {
	const [name, setName] = useState('');
	const [introduction, setIntroduction] = useState('');
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const profileModal = useModal();
	const nameModal = useModal();
	const revokeModal = useModal();

	const handleChangeName = () => {
		console.log(name, '이름이 변경되었습니다.');
		nameModal.hide();
		setName('');
	};

	const handleChangeIntroduction = () => {
		console.log(introduction, '소개가 변경되었습니다.');
		profileModal.hide();
		setIntroduction('');
	};

	const handleRevoke = () => {
		console.log('탈퇴 되었습니다.');
		revokeModal.hide();
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.userImg}>
					{userImg ? (
						<Image source={{ uri: userImg }} style={styles.userImg} />
					) : (
						<Ionicons
							name="person-sharp"
							color={colors[theme].GRAY_100}
							size={70}
						/>
					)}
					<TouchableOpacity
						style={styles.cameraBtn}
						onPress={() =>
							navigation.navigate(myNavigations.MY_PROFILE_IMAGE_EDIT)
						}
						activeOpacity={0.8}
					>
						<Ionicons name="camera" size={25} color={colors[theme].WHITE} />
					</TouchableOpacity>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{`${t('유저 정보')}`}</Text>
					<View style={styles.menuContainer}>
						<View style={styles.flexRow}>
							<Text style={styles.menuText}>{`${t('이름')}`}</Text>
							<Text style={styles.menuContent}>Sally LEE</Text>
						</View>
						<View style={styles.verticalLine} />
						<View style={styles.flexRow}>
							<Text style={styles.menuText}>{`${t('이메일')}`}</Text>
							<Text style={styles.menuContent}>Sally@naver.com</Text>
						</View>
						<View style={styles.verticalLine} />
						<View style={styles.flexRow}>
							<Text style={styles.menuText}>{`${t('프로필 소개')}`}</Text>
							<Text style={styles.menuContent}>특기는 여행, 취미는 기록</Text>
						</View>
					</View>
				</View>

				<View style={styles.menuContainer}>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => nameModal.show()}
					>
						<Text style={styles.menuText}>{`${t('이름 수정')}`}</Text>
					</TouchableOpacity>
					<View style={styles.verticalLine} />
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => profileModal.show()}
					>
						<Text style={styles.menuText}>{`${t('프로필 소개 수정')}`}</Text>
					</TouchableOpacity>
					<View style={styles.verticalLine} />
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => revokeModal.show()}
					>
						<Text style={styles.menuText}>{`${t('멜팅팟 회원 탈퇴')}`}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<ChangeNameModal
				isVisible={nameModal.isVisible}
				hideOption={() => {
					nameModal.hide();
					setName('');
				}}
				value={name}
				setValue={setName}
				onSubmit={handleChangeName}
			/>
			<ChangeProfileModal
				isVisible={profileModal.isVisible}
				hideOption={() => {
					profileModal.hide();
					setIntroduction('');
				}}
				value={introduction}
				setValue={setIntroduction}
				onSubmit={handleChangeIntroduction}
			/>
			<ChangeRevokeModal
				isVisible={revokeModal.isVisible}
				hideOption={revokeModal.hide}
				onSubmit={handleRevoke}
			/>
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
			gap: 45,
			alignItems: 'center',
			paddingVertical: 15,
			paddingHorizontal: 25,
		},
		flexRow: {
			display: 'flex',
			flexDirection: 'row',
		},
		infoContainer: {
			width: '100%',
			gap: 15,
		},
		cameraBtn: {
			position: 'absolute',
			bottom: 10,
			right: 0,
			width: 35,
			height: 35,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 500,
			backgroundColor: colors[theme].BLACK,
		},
		userImg: {
			width: 135,
			height: 135,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colors[theme].GRAY_200,
			borderRadius: 500,
		},
		title: {
			marginRight: 'auto',
			fontSize: 18,
			fontFamily: 'Pretendard-Light',
			color: colors[theme].BLACK,
		},
		menuContainer: {
			gap: 10,
			width: '100%',
			borderRadius: 10,
			padding: 15,
			backgroundColor: colors[theme].GRAY_100,
		},
		verticalLine: {
			width: '100%',
			alignSelf: 'center',
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GRAY_300,
		},
		menuText: {
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		menuContent: {
			fontSize: 14,
			marginLeft: 'auto',
			color: colors[theme].BLACK,
		},
	});

export default MyEditProfileScreen;
