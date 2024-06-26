import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '@/components/common/CustomButton';
import { colors } from '@/constants';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface MyProfileImageEditScreen {}

const files = [
	'https://images.unsplash.com/photo-1717158082997-97d18efbd633?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
	'https://plus.unsplash.com/premium_photo-1717478923249-b5bd2551412d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
	'https://images.unsplash.com/photo-1716538878686-38567b89b5a0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8',
];

function MyProfileImageEditScreen({}: MyProfileImageEditScreen) {
	const [selected, setSelected] = useState(0);
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const imagePicker = useImagePicker({
		initialImages: [],
		maxFiles: 3,
	});
	usePermission('PHOTO');
	usePermission('CAMERA');

	const handleSelected = (id: number) => {
		setSelected(id);
	};

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={['#FF3666', '#FF4F6E', '#D67DFF']}
				style={styles.redCircle}
			/>
			<LinearGradient
				colors={['#DCFFEA', '#C5FFDD', '#A5F2E1']}
				style={styles.greenCircle}
			/>
			<ScrollView contentContainerStyle={styles.flexGrow}>
				<View style={styles.heightFull}>
					<View>
						<Text style={styles.title}>{t('사진 등록')}</Text>
						<Text style={styles.description}>
							<Text style={styles.textPoint}>{t('얼굴을 확인')}</Text>
							{t('할 수 있는 사진을 1장 이상 등록해주세요.')}
						</Text>
						<Text style={styles.description}>
							{t('사진 등록 후 대표사진을 선택해주세요.')}
						</Text>
					</View>

					<View style={styles.imageContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.imageButton}
							onPress={() => imagePicker.handleChange()}
						>
							<MaterialIcons
								name="camera-alt"
								color={colors[theme].GRAY_400}
								size={25}
							/>
						</TouchableOpacity>
						{/* 서버 연결 후 수정 예정 */}
						{files.map((item, index) => (
							<TouchableOpacity
								activeOpacity={0.9}
								style={styles.imageButton}
								key={index}
								onPress={() => handleSelected(index)}
							>
								{imagePicker.imageUris && (
									<>
										<Image source={{ uri: item }} style={styles.image} />
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
				<View style={styles.buttonPosition}>
					<Text style={styles.notice}>
						{t('본 플랫폼은 타인 사진의 도용을 엄격히 금지합니다.')}
						{'\n'}
						{t(
							'이는 저작권 침해에 해당되며, 심각한 경우 법적 처벌을 받을 수 있습니다.',
						)}
					</Text>
					<CustomButton
						label={t('저장')}
						onPress={() => console.log('click')}
						variant={'filled'}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		redCircle: {
			width: 400,
			height: 400,
			position: 'absolute',
			borderRadius: 500,
			bottom: -130,
			right: 120,
			opacity: 0.8,
		},
		greenCircle: {
			width: 400,
			height: 400,
			position: 'absolute',
			borderRadius: 500,
			bottom: -80,
			left: 140,
		},
		flexGrow: {
			flexGrow: 1,
			paddingVertical: 20,
			paddingHorizontal: 30,
		},
		heightFull: {
			height: '100%',
		},
		title: {
			fontSize: 20,
			color: colors[theme].GRAY_700,
			marginBottom: 5,
		},
		description: {
			marginTop: 5,
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
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
		imageContainer: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: 10,
			marginTop: 40,
			paddingLeft: 10,
		},
		image: {
			width: '100%',
			height: '100%',
			borderRadius: 20,
		},
		buttonPosition: {
			marginTop: 'auto',
		},
		notice: {
			textAlign: 'center',
			fontSize: 10,
			color: colors[theme].GRAY_500,
			marginTop: 5,
			marginBottom: 10,
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

export default MyProfileImageEditScreen;
