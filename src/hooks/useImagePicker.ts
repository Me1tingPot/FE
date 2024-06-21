import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageUri } from '@/types';
import { getFormDataImages } from '@/utils';
import useMutateImages from './queries/useMutateImages';
import useImages from './queries/useMutateImages';

interface useImagePickerProps {
	initialImages: ImageUri[];
	maxFiles: number;
}

function useImagePicker({ initialImages = [], maxFiles }: useImagePickerProps) {
	const [imageUris, setImageUris] = useState(initialImages);
	const { t } = useTranslation();
	const { imagesMutation } = useImages();

	const addImageUris = (uris: string[]) => {
		if (imageUris.length > maxFiles) {
			Alert.alert(
				`이미지 개수 초과`,
				`추가 가능한 이미지는 최대 ${maxFiles}개입니다.`,
			);
			return;
		}

		setImageUris(prev => [...prev, ...uris.map(uri => ({ uri }))]);
	};

	const deleteImageUri = (uri: string) => {
		const newImageUris = imageUris.filter(image => image.uri !== uri);
		setImageUris(newImageUris);
	};
	console.log(imageUris);

	// image-crop-picker는 순서를 보장해주지 않음.
	const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
		// 기존 상태를 그대로 유지
		const copyImageUris = [...imageUris];
		// 위치가 다른 곳으로 이동하려면, 현재 위치에서 제거된 후에, 새로운 위치에 넣어주면 됨.
		const [removedImage] = copyImageUris.splice(fromIndex, 1);
		// 이동할 위치로, 아까 제거된 이미지를 넣어주면 됨.
		copyImageUris.splice(toIndex, 0, removedImage);
		setImageUris(copyImageUris);
	};

	const handleChange = () => {
		ImagePicker.openPicker({
			mediaType: 'photo',
			multiple: true,
			includeBase64: true,
			maxFiles: maxFiles,
			cropperChooseText: t('완료'),
			cropperCancelText: t('취소'),
		})
			.then(images => {
				// 서버에 저장할 수 있는 형태로 변경
				const formData = getFormDataImages(images);

				imagesMutation.mutate(formData, {
					onSuccess: data => {
						addImageUris(data);
					},
					onError: error => {
						console.log(error);
					},
				});
			})
			.catch(error => {
				if (error.code !== 'PICKER_CANCELED') {
					// Error Message
					console.error(error);
				}
			});
	};

	return {
		imageUris,
		handleChange,
		delete: deleteImageUri,
		changeOrder: changeImageUrisOrder,
	};
}
export default useImagePicker;
