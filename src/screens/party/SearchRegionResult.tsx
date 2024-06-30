import React from 'react';
import {
	Dimensions,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { LatLng } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/constants';
import { RegionInfo } from '@/hooks/useSearchLocation';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface SearchRegionResultProps {
	regionInfo: RegionInfo[];
	setKeyword?: (text: string) => void;
}

function SearchRegionResult({
	regionInfo,
	setKeyword,
}: SearchRegionResultProps) {
	const navigation = useNavigation();
	const { setMoveLocation, setSelectLocation } = useLocationStore();
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const handlePressRegionInfo = (latitude: string, longitude: string) => {
		const regionLocation = {
			latitude: Number(latitude),
			longitude: Number(longitude),
		};

		moveToMapScreen(regionLocation);
		setKeyword && setKeyword('');
	};

	const moveToMapScreen = (regionLocation: LatLng) => {
		setMoveLocation(regionLocation);
		setSelectLocation(regionLocation);
	};

	return (
		<View style={styles.container}>
			{regionInfo.length === 0 ? (
				<View style={styles.noResultContainer}>
					<Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
				</View>
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContainer}
				>
					{regionInfo.map((info, idx) => (
						<Pressable
							key={info.id}
							style={[
								styles.itemContainer,
								idx === regionInfo.length - 1 && styles.noItemBorder,
							]}
							onPress={() => handlePressRegionInfo(info.y, info.x)}
						>
							<View style={styles.placeNameContainer}>
								<Octicons
									name="location"
									size={20}
									color={colors[theme].EMERALD_500}
								/>
								<Text
									style={styles.placeText}
									ellipsizeMode="tail"
									numberOfLines={1}
								>
									{info.place_name}
								</Text>
							</View>
							<View style={styles.categoryContainer}>
								<Text style={styles.distanceText}>
									{(Number(info.distance) / 1000).toFixed(2)}km
								</Text>
								<Text style={styles.subInfoText}>{info.category_name}</Text>
							</View>
							<Text style={styles.addressText}>{info.road_address_name}</Text>
						</Pressable>
					))}
				</ScrollView>
			)}
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderColor: colors[theme].GRAY_200,
			borderRadius: 10,
			height: Dimensions.get('screen').height / 2,
			width: Dimensions.get('window').width * 0.9,
			backgroundColor: colors[theme].WHITE,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		},
		scrollContainer: {
			paddingBottom: 10,
		},
		itemContainer: {
			marginBottom: 10,
			padding: 10,
			borderRadius: 10,
			backgroundColor: colors[theme].GRAY_100,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 1.84,
			elevation: 2,
		},
		noItemBorder: {
			borderBottomWidth: 0,
		},
		placeNameContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 5,
		},
		placeText: {
			color: colors[theme].BLACK,
			flexShrink: 1,
			fontSize: 16,
			fontFamily: 'Pretendard-Bold',
			marginLeft: 5,
		},
		categoryContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 5,
		},
		distanceText: {
			color: colors[theme].BLACK,
		},
		subInfoText: {
			color: colors[theme].GRAY_500,
		},
		addressText: {
			fontSize: 14,
			color: colors[theme].GRAY_700,
		},
		noResultContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			width: Dimensions.get('window').width * 0.9,
		},
		noResultText: {
			fontSize: 16,
			color: colors[theme].GRAY_500,
		},
	});

export default SearchRegionResult;
