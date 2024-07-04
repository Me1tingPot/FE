import React from 'react';
import { StyleSheet } from 'react-native';
import {
	CameraOptions,
	ImageLibraryOptions,
	ImagePickerResponse,
	launchCamera,
	launchImageLibrary,
} from 'react-native-image-picker';
import { CompoundOption } from '../common/CompoundOption';

interface CameraOrLibraryProps {
	isVisible: boolean;
	hideOption: () => void;
	setFiles: (files: string[]) => void;
	cameraOptions: CameraOptions;
	libraryOptions: ImageLibraryOptions;
}

function CameraOrLibrary({
	isVisible,
	hideOption,
	setFiles,
	cameraOptions,
	libraryOptions,
}: CameraOrLibraryProps) {
	const openCamera = async () => {
		await launchCamera(cameraOptions, (response: ImagePickerResponse) => {
			if (response.errorCode) {
				console.error(response.errorCode);
			} else if (response.assets) {
				const fileUris = response.assets
					.map(asset => asset.uri)
					.filter(uri => uri !== undefined) as string[];
				setFiles(fileUris);
			}
		});
	};

	const openLibrary = async () => {
		await launchImageLibrary(
			libraryOptions,
			(response: ImagePickerResponse) => {
				if (response.errorCode) {
					console.error(response.errorMessage);
				} else if (response.assets) {
					const fileUris = response.assets
						.map(asset => asset.uri)
						.filter(uri => uri !== undefined) as string[];
					setFiles(fileUris);
				}
			},
		);
	};

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Divider />
					<CompoundOption.Button
						onPress={() => {
							openCamera();
							hideOption();
						}}
					>
						카메라로 찍기
					</CompoundOption.Button>
					<CompoundOption.Divider />
					<CompoundOption.Button
						onPress={() => {
							openLibrary();
							hideOption();
						}}
					>
						앨범에서 가져오기
					</CompoundOption.Button>
				</CompoundOption.Container>

				<CompoundOption.Container>
					<CompoundOption.Button isDanger onPress={hideOption}>
						취소하기
					</CompoundOption.Button>
				</CompoundOption.Container>
			</CompoundOption.Background>
		</CompoundOption>
	);
}

const styles = StyleSheet.create({});

export default CameraOrLibrary;
