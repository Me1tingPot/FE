import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, Platform } from 'react-native';
import {
	check,
	Permission,
	PERMISSIONS,
	request,
	RESULTS,
} from 'react-native-permissions';
import { alerts } from '@/constants';

type PermissionType = 'LOCATION' | 'PHOTO' | 'CAMERA';

type PermissionOS = {
	[key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
	LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
	PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
	CAMERA: PERMISSIONS.ANDROID.CAMERA,
};

const iosPermissions: PermissionOS = {
	LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
	PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
	CAMERA: PERMISSIONS.IOS.CAMERA,
};

function usePermission(type: PermissionType) {
	const { t } = useTranslation();
	useEffect(() => {
		(async () => {
			const isAndroid = Platform.OS === 'android';
			const permissionOS = isAndroid ? androidPermissions : iosPermissions;

			const checked = await check(permissionOS[type]);

			const showPermissionAlert = () => {
				Alert.alert(
					t(`${alerts[`${type}_PERMISSION`].TITLE}`),
					t(`${alerts[`${type}_PERMISSION`].DESCRIPTION}`),
					[
						{
							text: t('설정하기'),
							onPress: () => Linking.openSettings(),
						},
						{
							text: t('취소'),
							style: 'cancel',
						},
					],
				);
			};

			switch (checked) {
				case RESULTS.DENIED:
					if (isAndroid) {
						showPermissionAlert();
						return;
					}
					await request(permissionOS[type]);
					break;

				case RESULTS.BLOCKED:
				case RESULTS.LIMITED:
					showPermissionAlert();
					break;

				default:
					break;
			}
		})();
	});
}

export default usePermission;
