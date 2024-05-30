import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@/constants';
import { MyStackParamList } from '@/navigations/stack/MyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CompoundCard from '../common/CompoundCard';

interface ProfileContainerProps {}

const ProfileContainer = ({}: ProfileContainerProps) => {
	const navigation = useNavigation<NavigationProp<MyStackParamList>>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={{ marginVertical: 50 }}>
			<CompoundCard.Container
				onPress={() => navigation.navigate('EditProfile')}
				style={styles.container}
			>
				<CompoundCard.Profile size="lg" />
				<CompoundCard.TextContainer style={styles.textContainer}>
					<Text style={styles.nameText}>김용민</Text>
					<Text style={styles.descriptionText}>
						자기소개 자기소개 자기소개 자기소개
					</Text>
					<Text style={styles.descriptionText}>
						활동 내역: 주최 1회, 참여 6회
					</Text>
				</CompoundCard.TextContainer>
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
			gap: 10,
			height: 300,
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
		},
		descriptionText: {
			fontFamily: 'Pretendard-Bold',
			fontSize: 15,
			color: colors[theme].GRAY_500,
		},
	});

export default ProfileContainer;
