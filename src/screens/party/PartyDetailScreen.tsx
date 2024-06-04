import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import IconCircleButton from '@/components/common/IconCircleButton';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import useUserLocation from '../../hooks/useUserLocation';

interface PartyDetailScreenProps {}

const PartyDetailScreen = ({}: PartyDetailScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const mapRef = useRef<MapView | null>(null);
	const { userLocation, isUserLocationError } = useUserLocation();

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

	return (
		<>
			<MapView
				ref={mapRef}
				style={styles.container}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				followsUserLocation
				showsMyLocationButton={false}
			/>
			<View style={styles.buttonList}>
				<IconCircleButton
					family="Octicons"
					name="location"
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
