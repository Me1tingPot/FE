import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import CompoundCard from '@/components/common/CompoundCard';
import CustomButton from '@/components/common/CustomButton';
import PartyCard from '@/components/common/PartyCard';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface WishSaveScreenProps {}

const WishSaveScreen = ({}: WishSaveScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.buttonContainer}>
				<CustomButton
					label={t('모집 중')}
					size="small"
					textStyle={{ fontSize: 15 }}
				/>
				<CustomButton
					label={t('모집 예정')}
					size="small"
					textStyle={{ fontSize: 15, textAlign: 'center' }}
				/>
				<CustomButton
					label={t('마감')}
					size="small"
					textStyle={{ fontSize: 15 }}
				/>
			</View>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<PartyCard />
				<CompoundCard.Container>
					<CompoundCard.Badge>모집 중</CompoundCard.Badge>
					<View style={{ flexDirection: 'row', padding: 10 }}>
						<CompoundCard.Profile uri="https://reactnative.dev/img/tiny_logo.png" />
						<CompoundCard.TextContainer
							title="24회 전주국제영화제 뒤풀이 파티로 어서오세요"
							description="전주월드컵경기장 (전주특별자치도 전주시 덕진구 기린대로 1055)"
						/>
					</View>
					<CompoundCard.Divider />
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-around' }}
					>
						<CompoundCard.DetailInfo iconName="happy" info="김용민" />
						<CompoundCard.DetailInfo iconName="calendar" info="2024/05/27" />
						<CompoundCard.DetailInfo iconName="time" info="16:42" />
						<CompoundCard.DetailInfo iconName="people" info="5 (4~8)" />
					</View>
				</CompoundCard.Container>
			</ScrollView>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginVertical: 20,
		},
		scrollContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			paddingHorizontal: 20,
			paddingVertical: 20,
		},
	});

export default WishSaveScreen;
