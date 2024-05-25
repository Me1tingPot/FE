import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CameraOrLibrary from './CameraOrLibrary';

type FaceImgProps = {
	onNext: () => void;
};

const FaceImg = ({ onNext }: FaceImgProps) => {
	const {
		formState: { errors },
		setValue,
	} = useFormContext();
	const { theme } = useThemeStore();
	const modal = useModal();
	const styles = styling(theme);
	const { t } = useTranslation();
	const [files, setFiles] = useState<string[]>([]);
	usePermission('PHOTO');
	usePermission('CAMERA');

	const cameraOptions: CameraOptions = {
		cameraType: 'front',
		mediaType: 'photo',
	};

	const libraryOptions: ImageLibraryOptions = {
		selectionLimit: 3,
		mediaType: 'photo',
	};

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.flexGrow}
				data={[1]}
				renderItem={() => (
					<View style={styles.heightFull}>
						<View>
							<Text style={styles.title}>{t('사진 등록')}</Text>
							<Text style={styles.description}>
								<Text style={styles.textPoint}>{t('얼굴을 확인')}</Text>
								{t('할 수 있는 사진을 1장 이상 등록해주세요.')}
							</Text>
						</View>

						<View style={styles.imageContainer}>
							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.imageButton}
								onPress={modal.show}
							>
								<MaterialIcons
									name="camera-alt"
									color={colors[theme].GRAY_400}
									size={25}
								/>
							</TouchableOpacity>
							{files.map((item, index) => (
								<View style={styles.imageButton}>
									{files[index] ? (
										<Image
											source={{ uri: files[index] }}
											style={styles.image}
										/>
									) : (
										<MaterialIcons
											name={item}
											color={colors[theme].GRAY_400}
											size={25}
										/>
									)}
								</View>
							))}
						</View>
					</View>
				)}
			/>
			<View style={styles.buttonPosition}>
				<Text style={styles.notice}>
					{t('본 플랫폼은 타인 사진의 도용을 엄격히 금지합니다.')}
					{'\n'}
					{t(
						'이는 저작권 침해에 해당되며, 심각한 경우 법적 처벌을 받을 수 있습니다.',
					)}
				</Text>
				<CustomButton
					label={t('다음으로')}
					onPress={() => {
						onNext();
						setValue('faceImg', files);
					}}
					variant={'filled'}
				/>
			</View>
			<CameraOrLibrary
				isVisible={modal.isVisible}
				hideOption={modal.hide}
				cameraOptions={cameraOptions}
				libraryOptions={libraryOptions}
				setFiles={setFiles}
			/>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		buttonPosition: {
			marginTop: 'auto',
		},
		title: {
			fontSize: 20,
			color: colors[theme].GRAY_700,
		},
		description: {
			marginTop: 10,
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
		notice: {
			textAlign: 'center',
			fontSize: 10,
			color: colors[theme].GRAY_500,
			marginTop: 5,
			marginBottom: 10,
		},
		imageButton: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: '47%',
			height: 180,
			backgroundColor: colors[theme].WHITE,
			borderRadius: 20,
			borderWidth: 0.5,
			borderColor: colors[theme].GRAY_400,
		},
		heightFull: {
			height: '100%',
		},
		flexGrow: {
			flexGrow: 1,
		},
		image: {
			width: '100%',
			height: '100%',
			borderRadius: 20,
		},
		imageContainer: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: 10,
			marginTop: 40,
		},
	});

export default FaceImg;
