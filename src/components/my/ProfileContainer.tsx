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
				</CompoundCard.TextContainer>
				<View style={styles.rowContainer}>
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>주최</Text>
						<Text style={styles.columnText}>1회</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>참여</Text>
						<Text style={styles.columnText}>6회</Text>
					</View>
					<View style={styles.separator} />
					<View style={styles.columnContainer}>
						<Text style={styles.columnText}>국적</Text>
						<Text style={styles.columnText}>대한민국</Text>
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
			overflow: 'hidden', // Ensure the gradient doesn't overflow the container
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
		rowContainer: {
			height: 70,
			borderRadius: 20,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
			backgroundColor: colors[theme].EMERALD_500,
		},
		columnContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		separator: {
			width: 1,
			height: '60%',
			backgroundColor: colors[theme].WHITE,
		},
		columnText: {
			fontFamily: 'Pretendard-Regular',
			color: colors[theme].UNCHANGE_BLACK,
		},
	});

export default ProfileContainer;
