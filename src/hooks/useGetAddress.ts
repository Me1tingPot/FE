import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { LatLng } from 'react-native-maps';
import axios from 'axios';
import { errorMessages } from '@/constants';
import useArea from './queries/useArea';

function useGetAddress(location: LatLng) {
	const { latitude, longitude } = location;
	const [addressData, setAdressData] = useState({
		address: '',
		areaId: '',
		formattedLatitude: 0,
		formattedLongitude: 0,
	});
	const { useSearchAreaByCoord } = useArea();
	const { data } = useSearchAreaByCoord(latitude, longitude);
	const areaId = data?.data?.areaId;

	useEffect(() => {
		const source = axios.CancelToken.source();

		(async () => {
			try {
				const { data } = await axios.get(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=${Config.GOOGLE_MAPS_API_KEY}&language=ko`,
					{ cancelToken: source.token }, // CancelToken을 요청에 추가합니다.
				);

				const address = data.results.length
					? data.results[0].formatted_address
					: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
				const formattedLatitude = parseFloat(latitude.toFixed(3));
				const formattedLongitude = parseFloat(longitude.toFixed(3));

				setAdressData({
					address,
					areaId,
					formattedLatitude,
					formattedLongitude,
				});
			} catch (error) {
				if (axios.isCancel(error)) {
					console.log('Request canceled', error.message);
				} else {
					console.log(error);
					setAdressData(prev => ({
						address: errorMessages.CANNOT_GET_ADDRESS,
						areaId: errorMessages.CANNOT_GET_ADDRESS,
						formattedLatitude: 0,
						formattedLongitude: 0,
					}));
				}
			}
		})();

		return () => {
			source.cancel('Operation canceled by the user.');
		};
	}, [latitude, longitude]);

	return { ...addressData };
}

export default useGetAddress;
