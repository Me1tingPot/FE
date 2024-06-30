import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultipleGradientBgTextInput from '@/components/community/MultipleGradientBgTextInput';
import CameraOrLibrary from '@/components/signup/CameraOrLibrary';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityQuestionWriteScreenProps = {};

function CommunityQuestionWriteScreen({}: CommunityQuestionWriteScreenProps) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [files, setFiles] = useState<string[]>([]);
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const modal = useModal();

	usePermission('PHOTO');
	usePermission('CAMERA');

	const cameraOptions: CameraOptions = {
		cameraType: 'front',
		mediaType: 'photo',
	};

	const libraryOptions: ImageLibraryOptions = {
		selectionLimit: 10,
		mediaType: 'photo',
	};

	const deleteImage = (img: string) => {
		const imgList = files.filter(item => item !== img);
		setFiles(imgList);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyBoardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<MultipleGradientBgTextInput
						title={title}
						onChangeTitle={t => setTitle(t)}
						titlePlaceholder={t(`궁금한 것을 물어보세요!`)}
						content={content}
						onChangeContent={t => setContent(t)}
						contentPlaceholder={t(`상세 내용을 작성해주세요.`)}
					/>
				</ScrollView>
				<View style={[styles.displayRow, styles.imageContainer]}>
					<FlatList
						data={files}
						horizontal
						renderItem={({ item, index }) => (
							<View key={index} style={styles.imageLayout}>
								<Image source={{ uri: item }} style={styles.image} />
								<Pressable
									style={styles.imageDelete}
									onPress={() => deleteImage(item)}
								>
									<Ionicons
										name="close-outline"
										size={15}
										color={colors[theme].BLACK}
									/>
								</Pressable>
							</View>
						)}
					/>
				</View>
				<View style={[styles.displayRow, styles.menu]}>
					<TouchableOpacity activeOpacity={0.8} onPress={modal.show}>
						<Ionicons
							name="camera-outline"
							color={colors[theme].GRAY_400}
							size={30}
						/>
					</TouchableOpacity>
					<View style={[styles.displayRow]}>
						<Pressable
							style={styles.menuBtn}
							onPress={() => console.log('click')}
						>
							<Text style={styles.menuText}>{t('임시저장')}</Text>
						</Pressable>
						<Pressable
							style={styles.menuBtn}
							onPress={() => console.log('click')}
						>
							<Text style={styles.menuText}>{t('게시하기')}</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAvoidingView>
			<CameraOrLibrary
				isVisible={modal.isVisible}
				hideOption={modal.hide}
				cameraOptions={cameraOptions}
				libraryOptions={libraryOptions}
				setFiles={setFiles}
			/>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		displayRow: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
		},
		keyBoardView: {
			flex: 1,
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 10,
			paddingHorizontal: 25,
			paddingTop: 20,
		},
		image: {
			position: 'relative',
			width: 45,
			height: 45,
			backgroundColor: colors[theme].GRAY_300,
		},
		imageContainer: {
			paddingHorizontal: 25,
			paddingVertical: 10,
		},
		imageLayout: {
			marginRight: 10,
		},
		menu: {
			paddingTop: 15,
			paddingBottom: 20,
			paddingHorizontal: 15,
			justifyContent: 'space-between',
			backgroundColor: colors[theme].WHITE,
			opacity: 0.8,
		},
		menuBtn: {
			padding: 5,
			borderWidth: 1,
			borderColor: colors[theme].GRAY_400,
		},
		menuText: {
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Light',
		},
		imageDelete: {
			position: 'absolute',
			top: 0,
			right: 0,
			padding: 1,
			backgroundColor: colors[theme].WHITE,
			opacity: 0.7,
		},
	});

export default CommunityQuestionWriteScreen;
