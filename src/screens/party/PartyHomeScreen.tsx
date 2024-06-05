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
import { alerts } from '@/constants';
import usePermission from '@/hooks/usePermission';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import mapStyle from '@/style/mapStyle';
import { ThemeMode } from '@/types';
import useUserLocation from '../../hooks/useUserLocation';

interface PartyDetailScreenProps {
	navigation: NavigationProp<PartyStackParamList>;
}

const PartyDetailScreen = ({ navigation }: PartyDetailScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const mapRef = useRef<MapView | null>(null);
	const { userLocation, isUserLocationError } = useUserLocation();
	const [selectLocation, setSelectLocation] = useState<LatLng | null>();
	usePermission('LOCATION');

	const handlePressUserLocation = () => {
		if (isUserLocationError) {
			// Error Message
			return;
		}
		// map 이동
		mapRef.current?.animateToRegion({
			latitude: userLocation.latitude,
			longitude: userLocation.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
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
				<CustomMarker
					coordinate={{
						latitude: 37.5516032365118,
						longitude: 126.98989626020192,
					}}
				/>
				<Marker
					coordinate={{
						latitude: 37.56,
						longitude: 126.98989626020192,
					}}
				/>
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
