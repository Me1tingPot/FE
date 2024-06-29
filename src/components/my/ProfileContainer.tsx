import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@/constants';
import { MyStackParamList } from '@/navigations/stack/MyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { USER_PROFILE_DATA_TYPES } from '@/types/api/types';
import CompoundCard from '../common/CompoundCard';

interface ProfileContainerProps {
	profileData?: USER_PROFILE_DATA_TYPES;
}

const ProfileContainer = ({ profileData }: ProfileContainerProps) => {
	const navigation = useNavigation<NavigationProp<MyStackParamList>>();
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={{ marginVertical: 25 }}>
			<CompoundCard.Container
				onPress={() => navigation.navigate('EditProfile')}
				style={styles.container}
			>
				<CompoundCard.Profile size="lg" uri={profileData?.thumbnail} />
				<CompoundCard.TextContainer style={styles.textContainer}>
					<Text style={styles.nameText}>{profileData?.name}</Text>
					<Text style={styles.descriptionText}>
						{profileData?.bio
							? profileData?.bio
							: '아직 소개를 입력하지 않았습니다.'}
					</Text>
				</CompoundCard.TextContainer>
				<View style={styles.rowContainer}>
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>주최</Text>
						<Text style={styles.columnText}>{profileData?.host_count}회</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>참여</Text>
						<Text style={styles.columnText}>
							{profileData?.participate_count}회
						</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>국적</Text>
						<Text style={styles.columnText}>{profileData?.nationality}</Text>
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
	});

export default ProfileContainer;
