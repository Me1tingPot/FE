import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { getProfileUploadUrl, uploadImages } from '@/api';
import { ImageUri } from '@/types';
import { IMAGE_DTO } from '@/types/api/types';
import { getFormDataImages } from '@/utils';
import useImages from './queries/useMutateImages';

interface useProfileImagesPickerProps {
	initialImages: ImageUri[];
	maxFiles: number;
}

function useProfileImagesPicker({
	initialImages = [],
	maxFiles,
}: useProfileImagesPickerProps) {
	const [imageUris, setImageUris] = useState(initialImages);
	const [uploadedImages, setUploadedImages] = useState<IMAGE_DTO[]>([]);
	const { t } = useTranslation();
	const { profileImagesMutation } = useImages();

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

	const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
		const copyImageUris = [...imageUris];
		const [removedImage] = copyImageUris.splice(fromIndex, 1);
		copyImageUris.splice(toIndex, 0, removedImage);
		setImageUris(copyImageUris);
	};

	const handleChange = async () => {
		try {
			const images = await ImagePicker.openPicker({
				mediaType: 'photo',
				multiple: true,
				includeBase64: true,
				maxFiles: maxFiles,
				cropperChooseText: t('완료'),
				cropperCancelText: t('취소'),
			});

			const formData = getFormDataImages(images);
			const uploadedImageData = [];

			for (let i = 0; i < images.length; i++) {
				const { data } = await getProfileUploadUrl();
				const { uploadUrl, fileKey } = data;

				await profileImagesMutation.mutateAsync({
					uploadUrl: uploadUrl,
					body: formData,
				});

				uploadedImageData.push({
					imageKey: fileKey,
					thumbnail: i === 0,
					sequence: i + 1,
				});
			}

			addImageUris(images.map(img => img.path));
			setUploadedImages(uploadedImageData);
			return uploadedImageData;
		} catch (error: any) {
			if (error.code !== 'PICKER_CANCELED') {
				console.error(error);
			}
		}
	};

	return {
		uploadedImages,
		imageUris,
		handleChange,
		delete: deleteImageUri,
		changeOrder: changeImageUrisOrder,
	};
}
export default useProfileImagesPicker;
