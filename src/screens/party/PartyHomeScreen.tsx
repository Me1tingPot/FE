import React, { useCallback, useRef, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	ScrollView,
	Pressable,
	View,
	RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import PartyCard from '@/components/common/PartyCard';
import PartyOptionBottomSheet, {
	IFilter,
} from '@/components/party/PartyOptionBottomSheet';
import { colors } from '@/constants';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PartyHomeScreenProps {
	navigation: NavigationProp<PartyStackParamList>;
}

const PartyHomeScreen = ({ navigation }: PartyHomeScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [refreshing, setRefreshing] = useState(false);

	const handleClosePress = () => bottomSheetModalRef.current?.close();
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	const [filter, setFilter] = useState<IFilter>({
		region: '',
		duration: '',
		status: '',
	});

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<BottomSheetModalProvider>
			<SafeAreaView style={styles.container}>
				<Pressable onPress={handleOpenPress} style={styles.buttonContainer}>
					<Text style={styles.filterText}>필터</Text>
					<Ionicons name="options" size={23} color={colors[theme].RED_500} />
				</Pressable>
				<View style={styles.selectedContainer}>
					<View style={styles.selectedButton}>
						<Text style={styles.selectedText}>{filter.region}</Text>
					</View>
					<View style={styles.selectedButton}>
						<Text style={styles.selectedText}>{filter.duration}</Text>
					</View>
					<View style={styles.selectedButton}>
						<Text style={styles.selectedText}>{filter.status}</Text>
					</View>
				</View>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[colors[theme].BLACK]}
							tintColor={colors[theme].BLACK}
						/>
					}
				>
					<PartyCard />
				</ScrollView>
				<View style={styles.buttonList}>
					<IconCircleButton
						family="Octicons"
						name="pencil"
						color={colors[theme].WHITE}
						size={30}
						onPress={() => navigation.navigate('PartyWrite')}
					/>
				</View>
				<PartyOptionBottomSheet
					ref={bottomSheetModalRef}
					handleClosePress={handleClosePress}
					filter={filter}
					setFilter={setFilter}
				/>
			</SafeAreaView>
		</BottomSheetModalProvider>
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
			justifyContent: 'flex-end',
			alignItems: 'center',
			padding: 20,
			gap: 10,
		},
		filterText: {
			fontSize: 15,
			color: colors[theme].RED_500,
		},
		scrollContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			paddingHorizontal: 20,
		},
		selectedContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginBottom: 20,
		},
		selectedText: {
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-bold',
		},
		selectedButton: {
			borderColor: colors[theme].GRAY_700,
		},
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
	});

export default PartyHomeScreen;
