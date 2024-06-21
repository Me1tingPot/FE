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
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import usePermission from '@/hooks/usePermission';
import useProfileImagesPicker from '@/hooks/useProfileImagesPicker';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

type ProfileImageProps = {
	onNext: () => void;
};

const ProfileImage = ({ onNext }: ProfileImageProps) => {
	const [selected, setSelected] = useState(0);
	const {
		formState: { errors },
		setValue,
	} = useFormContext<SignupInputs>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const formDataImages = useProfileImagesPicker({
		initialImages: [],
		maxFiles: 3,
	});
	usePermission('PHOTO');
	usePermission('CAMERA');

	const handleSelected = (id: number) => {
		setSelected(id);
	};

	const handleSubmit = () => {
		if (formDataImages.uploadedImages.length <= 0) {
			Toast.show({
				type: 'error',
				text1: t('최소 1개의 이미지를 선택해주세요.'),
				visibilityTime: 2000,
				position: 'bottom',
			});
			return;
		}
		const updatedImages = formDataImages.uploadedImages.map((image, index) => ({
			...image,
			thumbnail: index === selected,
		}));
		console.log(updatedImages);
		onNext();
		setValue('profileImages', updatedImages);
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
								onPress={formDataImages.handleChange}
							>
								<MaterialIcons
									name="camera-alt"
									color={colors[theme].GRAY_400}
									size={25}
								/>
							</TouchableOpacity>
							{formDataImages.imageUris.map((item, index) => (
								<TouchableOpacity
									activeOpacity={0.9}
									style={styles.imageButton}
									key={index}
									onPress={() => handleSelected(index)}
								>
									{item.uri && (
										<>
											<Image source={{ uri: item.uri }} style={styles.image} />
											<View
												style={[
													styles.unSelectedImg,
													selected === index && styles.selectedImg,
												]}
											>
												<Text
													style={
														selected === index
															? styles.selectedText
															: styles.unSelectedText
													}
												>
													{t('대표')}
												</Text>
											</View>
										</>
									)}
								</TouchableOpacity>
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
					onPress={handleSubmit}
					variant={'filled'}
					isLoading={formDataImages.isLoading}
				/>
			</View>
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
		selectedImg: {
			borderColor: colors[theme].EMERALD_500,
		},
		unSelectedImg: {
			position: 'absolute',
			top: 15,
			left: 15,
			paddingVertical: 3,
			paddingHorizontal: 10,
			borderWidth: 0.5,
			borderColor: colors[theme].GRAY_300,
			borderRadius: 300,
			backgroundColor: colors[theme].WHITE,
		},
		selectedText: {
			fontSize: 10,
			color: colors[theme].EMERALD_500,
		},
		unSelectedText: {
			fontSize: 10,
			color: colors[theme].GRAY_700,
		},
	});

export default ProfileImage;
