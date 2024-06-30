import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@/constants';
import useGetUserData from '@/hooks/useGetUserData';
import { MyStackParamList } from '@/navigations/stack/MyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CompoundCard from '../common/CompoundCard';

interface ProfileContainerProps {}

const ProfileContainer = () => {
	const { t } = useTranslation();
	const navigation = useNavigation<NavigationProp<MyStackParamList>>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const {
		name,
		thumbnail,
		bio,
		host_count,
		participate_count,
		nationality,
		isLoading,
	} = useGetUserData();

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ marginVertical: 25 }}>
			<CompoundCard.Container
				onPress={() => navigation.navigate('EditProfile')}
				style={styles.container}
			>
				<CompoundCard.Profile size="lg" uri={thumbnail} />
				<CompoundCard.TextContainer style={styles.textContainer}>
					<Text style={styles.nameText}>{name}</Text>
					<Text style={styles.descriptionText}>
						{bio ? bio : t('아직 소개를 입력하지 않았습니다.')}
					</Text>
				</CompoundCard.TextContainer>
				<View style={styles.rowContainer}>
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>{t('주최')}</Text>
						<Text style={styles.columnText}>
							{host_count}
							{t('회')}
						</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>{t('참여')}</Text>
						<Text style={styles.columnText}>
							{participate_count}
							{t('회')}
						</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>{t('국적')}</Text>
						<Text style={styles.columnText}>{nationality}</Text>
					</View>
				</View>
			</CompoundCard.Container>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			alignItems: 'center',
			paddingVertical: 20,
			paddingHorizontal: 20,
			gap: 10,
			height: 300,
			borderRadius: 20,
		},
		textContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 15,
		},
		nameText: {
			fontFamily: 'Pretendard-Bold',
			fontSize: 22,
			color: colors[theme].BLACK,
			marginRight: 10,
		},
		descriptionText: {
			fontFamily: 'Pretendard-Bold',
			fontSize: 15,
			color: colors[theme].GRAY_500,
		},
		rowContainer: {
			height: 70,
			borderRadius: 20,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
		},
		columnContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		separator: {
			width: 1,
			height: '60%',
			backgroundColor: colors[theme].GRAY_300,
		},
		columnText: {
			fontFamily: 'Pretendard-Regular',
			color: colors[theme].GRAY_700,
		},
		loadingContainer: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: 300,
		},
	});

export default ProfileContainer;
