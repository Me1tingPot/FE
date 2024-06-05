import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng, MapMarkerProps, Marker } from 'react-native-maps';
import { colorHex, colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CustomMarkerProps extends MapMarkerProps {
	coordinate: LatLng;
}

const CustomMarker = ({ coordinate, ...props }: CustomMarkerProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Marker coordinate={coordinate} {...props}>
			<View style={styles.container}>
				<View style={[styles.marker]} />
				<View style={styles.pin} />
			</View>
		</Marker>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			height: 35,
			width: 32,
			alignItems: 'center',
		},
		marker: {
			transform: [{ rotate: '45deg' }],
			width: 27,
			height: 27,
			borderRadius: 27,
			borderBottomRightRadius: 1,
			borderWidth: 1,
			borderColor: colors[theme].BLACK,
			backgroundColor: colors[theme].RED_500,
		},
		pin: {
			width: 10,
			height: 10,
			borderRadius: 5,
			backgroundColor: colors[theme].WHITE,
			position: 'absolute',
			bottom: -5,
			borderWidth: 2,
			borderColor: colors[theme].EMERALD_500,
		},
	});

export default CustomMarker;
