import { useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, {
	Callout,
	LatLng,
	LongPressEvent,
	Marker,
	PROVIDER_GOOGLE,
} from 'react-native-maps';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import CustomMarker from '@/components/party/CustomMarker';
import MarkerDetailModal from '@/components/party/MarkerDetailModal';
import { alerts } from '@/constants';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import mapStyle from '@/style/mapStyle';
import { ThemeMode } from '@/types';
import useUserLocation from '../../hooks/useUserLocation';

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
	const styles = styling(theme);
	const mapRef = useRef<MapView | null>(null);
	const { userLocation, isUserLocationError } = useUserLocation();
	const [selectLocation, setSelectLocation] = useState<LatLng | null>();
	const [markerId, setMarkerId] = useState<number | null>(null);
	const markerDetailModal = useModal();
	usePermission('LOCATION');

	const moveMapView = (coordinate: LatLng) => {
		mapRef.current?.animateToRegion({
			...coordinate,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

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

	return (
		<>
			<MapView
				ref={mapRef}
				style={styles.container}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				followsUserLocation
				showsMyLocationButton={false}
				customMapStyle={mapStyle}
				// 지도 찍는 Event
				onLongPress={handleLongPressMapView}
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
			</View>
			<MarkerDetailModal
				isVisible={markerDetailModal.isVisible}
				markerId={markerId}
				hide={markerDetailModal.hide}
			/>
		</>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
	});

export default PartyDetailScreen;
