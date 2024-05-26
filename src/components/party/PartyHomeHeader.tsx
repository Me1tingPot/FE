import React from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, partyNavigations } from '@/constants';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type PartyHomeHeaderProps = CompositeNavigationProp<
	StackNavigationProp<FeedTabParamList>,
	StackNavigationProp<PartyStackParamList>
>;

const PartyHomeHeader = (navigation: PartyHomeHeaderProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	console.log(navigation);

	return (
		<SafeAreaView>
			<View style={styles.selectContainer}>
				<Pressable
					style={[styles.selectButton]}
					onPress={() => navigation.navigate(partyNavigations.PARTY_SAVE)}
				>
					<Text style={[styles.buttonText]}>저장</Text>
				</Pressable>
				<Pressable
					style={[styles.selectButton]}
					onPress={() =>
						navigation.navigate(partyNavigations.PARTY_RESERVATION)
					}
				>
					<Text style={[styles.buttonText]}>예약</Text>
				</Pressable>
			</View>
			<View style={styles.lineContainer}>
				<View style={[styles.halfLine]} />
				<View style={[styles.halfLine]} />
			</View>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		selectContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		selectButton: {
			justifyContent: 'center',
		},
		buttonText: {
			fontSize: 20,
			fontFamily: 'Pretendard-Bold',
			color: colors[theme].GRAY_500,
		},
		selectText: {
			color: colors[theme].BLACK,
		},
		lineContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 10,
		},
		halfLine: {
			borderBottomWidth: 3,
			width: '100%',
			borderBottomColor: colors[theme].GRAY_300,
		},
		selectedHalfLine: {
			borderBottomColor: colors[theme].EMERALD_500,
		},
	});

export default PartyHomeHeader;
