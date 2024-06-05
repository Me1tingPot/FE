import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { LatLng } from 'react-native-maps';
import axios from 'axios';
import { errorMessages } from '@/constants';

function useGetAddress(location: LatLng) {
	const { latitude, longitude } = location;
	const [address, setAddress] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=${Config.GOOGLE_MAPS_API_KEY}&language=ko`,
				);

				const address = data.results.length
					? data.results[0].formatted_address
					: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;

				setAddress(address);
			} catch (error) {
				setAddress(errorMessages.CANNOT_GET_ADDRESS);
			}
		})();
	}, [latitude, longitude]);

	return address;
}

export default useGetAddress;
