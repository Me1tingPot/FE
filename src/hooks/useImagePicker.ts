import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageUri } from '@/types';
import { getFormDataImages } from '@/utils';
import useMutateImages from './queries/useMutateImages';

interface useImagePickerProps {
	initialImages: ImageUri[];
	maxFiles: number;
}

function useImagePicker({ initialImages = [], maxFiles }: useImagePickerProps) {
	const [imageUris, setImageUris] = useState(initialImages);
	const { t } = useTranslation();
	const uploadImages = useMutateImages();

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
	console.log(imageUris);

	const deleteImageUri = (uri: string) => {
		const newImageUris = imageUris.filter(image => image.uri !== uri);
		setImageUris(newImageUris);
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

				uploadImages.mutate(formData, {
					onSuccess: data => {
						addImageUris(data);
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
	};
}
export default useImagePicker;
