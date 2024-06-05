import { useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import MapView, {
	Callout,
	LatLng,
	LongPressEvent,
	Marker,
	PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import MainSearchInput from '@/components/common/MainSearchInput';
import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';
import CustomMarker from '@/components/party/CustomMarker';
import MarkerDetailModal from '@/components/party/MarkerDetailModal';
import PartyOptionBottomSheet, {
	IFilter,
} from '@/components/party/PartyOptionBottomSheet';
import { alerts, colors } from '@/constants';
import { numbers } from '@/constants/numbers';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import useSearchLocation from '@/hooks/useSearchLocation';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/useThemeStore';
import mapStyle from '@/style/mapStyle';
import getMapStyle from '@/style/mapStyle';
import { ThemeMode } from '@/types';
import useUserLocation from '../../hooks/useUserLocation';
import SearchRegionResult from './SearchRegionResult';

interface PartyDetailScreenProps {
	navigation: NavigationProp<PartyStackParamList>;
}

const markers = [
	{ id: 1, coordinate: { latitude: 37.5915, longitude: 127.027 } },
	{ id: 2, coordinate: { latitude: 37.5925, longitude: 127.036 } },
	{ id: 3, coordinate: { latitude: 37.5935, longitude: 127.005 } },
	{ id: 4, coordinate: { latitude: 37.5905, longitude: 127.023 } },
	{ id: 5, coordinate: { latitude: 37.5885, longitude: 127.01 } },
];

const PartyDetailScreen = ({ navigation }: PartyDetailScreenProps) => {
	const { theme } = useThemeStore();
	const insets = useSafeAreaInsets();
	const styles = styling(theme, insets);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { userLocation, isUserLocationError } = useUserLocation();
	const { selectLocation, setSelectLocation } = useLocationStore();
	const [markerId, setMarkerId] = useState<number | null>(null);
	const markerDetailModal = useModal();
	const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();
	usePermission('LOCATION');

	const handleClosePress = () => bottomSheetModalRef.current?.close();
	const handleOpenPress = () => bottomSheetModalRef.current?.present();

	const [filter, setFilter] = useState<IFilter>({
		region: '',
		duration: '',
		status: '',
	});

	const handlePressUserLocation = () => {
		if (isUserLocationError) {
			// Error Message
			return;
		}
		// map 이동
		moveMapView(userLocation);
	};

	const handlePressAddPost = () => {
		// 위치를 고르지 않고, 누르면 에러 발생.
		if (!selectLocation) {
			return Alert.alert(
				alerts.NOT_SELECTED_LOCATION.TITLE,
				alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
			);
		}
		navigation.navigate('PartyWrite', {
			location: selectLocation,
		});
		// 뒤로 갔을 떄 위치정보 초기화
		setSelectLocation(null);
	};

	// Which Marker Click judgement by Id
	const handlePressMarker = (id: number, coordinate: LatLng) => {
		moveMapView(coordinate);
		setMarkerId(id);
		markerDetailModal.show();
	};

	const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
		setSelectLocation(nativeEvent.coordinate);
	};

	const handlePressSearch = () => {
		navigation.navigate('PartySearch');
	};

	const [keyword, setKeyword] = useState<string>('');
	const { regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage } =
		useSearchLocation(keyword, userLocation);

	const handleChangeKeyword = (text: string) => {
		setKeyword(text);
	};

	return (
		<BottomSheetModalProvider>
			<MapView
				ref={mapRef}
				style={styles.container}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				followsUserLocation
				showsMyLocationButton={false}
				customMapStyle={getMapStyle(theme)}
				// 지도 찍는 Event
				onLongPress={handleLongPressMapView}
				onPress={() => {
					setKeyword('');
					Keyboard.dismiss();
				}}
				onRegionChangeComplete={handleChangeDelta}
				region={{
					...userLocation,
					...numbers.INITIAL_DELTA,
				}}
			>
				{markers.map(({ id, coordinate }) => (
					<CustomMarker
						key={id}
						coordinate={coordinate}
						onPress={() => handlePressMarker(id, coordinate)}
					/>
				))}
				{selectLocation && (
					<Callout>
						<Marker coordinate={selectLocation} />
					</Callout>
				)}
			</MapView>
			<View style={styles.buttonList}>
				<IconCircleButton
					family="MaterialIcons"
					name="add"
					onPress={handlePressAddPost}
				/>
				<IconCircleButton
					family="MaterialIcons"
					name="my-location"
					onPress={handlePressUserLocation}
				/>
				<IconCircleButton
					family="MaterialIcons"
					name="filter"
					onPress={handleOpenPress}
				/>
			</View>
			<View style={styles.searchContainer}>
				<MainSearchInput
					autoFocus
					value={keyword}
					onChangeText={handleChangeKeyword}
					placeholder="검색할 장소를 입력하세요!"
					onSubmit={() => Keyboard.dismiss()}
				/>
				{keyword && (
					<View
						style={{
							flex: 1,
							backgroundColor: 'white',
						}}
					>
						<SearchRegionResult
							regionInfo={regionInfo}
							setKeyword={setKeyword}
						/>
						<Pagination
							pageParam={pageParam}
							fetchNextPage={fetchNextPage}
							fetchPrevPage={fetchPrevPage}
							hasNextPage={hasNextPage}
							totalLength={regionInfo.length}
						/>
					</View>
				)}
			</View>

			<MarkerDetailModal
				isVisible={markerDetailModal.isVisible}
				markerId={markerId}
				hide={markerDetailModal.hide}
			/>
			<PartyOptionBottomSheet
				ref={bottomSheetModalRef}
				handleClosePress={handleClosePress}
				filter={filter}
				setFilter={setFilter}
			/>
		</BottomSheetModalProvider>
	);
};

const styling = (theme: ThemeMode, insets: { top: number }) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		searchContainer: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: 'center',
			top: insets.top + 15,
			left: 0,
			right: 0,
			paddingHorizontal: 20,
			gap: 20,
		},
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
	});

export default PartyDetailScreen;
