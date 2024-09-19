import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ActivityIndicator,
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
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { POST_TYPE } from '@/api/community';
import queryClient from '@/api/queryClient';
import MultipleGradientBgTextInput from '@/components/community/MultipleGradientBgTextInput';
import CameraOrLibrary from '@/components/signup/CameraOrLibrary';
import { colors, communityNavigations, queryKeys } from '@/constants';
import useCommunity from '@/hooks/queries/useCommunity';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import usePostImagePicker from '@/hooks/usePostImagePicker';
import useThrottle from '@/hooks/useThrottle';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import usePostStore from '@/store/usePostStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityPostingWriteScreenProps = {
	navigation: NavigationProp<CommunityStackParamList>;
};

function CommunityPostingWriteScreen({
	navigation,
}: CommunityPostingWriteScreenProps) {
	const { post } = usePostStore();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const modal = useModal();
	const { postMutation, updatePostMutation } = useCommunity();
	const { imageUris, uploadedImages } = usePostImagePicker({
		initialImages: [],
		maxFiles: 10,
	});

	const isEdit = !!post;
	const postImgData = post?.imgData.map(img => img.imageUrl);
	const [title, setTitle] = useState(post?.title || '');
	const [content, setContent] = useState(post?.content || '');
	const [files, setFiles] = useState<string[]>(postImgData || []);

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

	const handleOnSubmit = useThrottle(() => {
		if (isEdit) {
			updatePostMutation.mutate(
				{
					postId: post.postId,
					title,
					content,
					postType: POST_TYPE.POSTING,
					imageKeys: uploadedImages,
				},
				{
					onSuccess: () => {
						navigation.navigate(communityNavigations.COMMUNITY_POSTING_DETAIL, {
							id: post.postId,
						});
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, post.postId],
						});
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, POST_TYPE.POSTING],
						});
					},
					onError: error => {
						Toast.show({
							type: 'error',
							text1:
								error.response?.data.message || '게시물 업로드 오류입니다.',
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
				},
			);
		} else {
			postMutation.mutate(
				{
					title,
					content,
					postType: POST_TYPE.POSTING,
					imageKeys: uploadedImages,
					isDraft: false,
				},
				{
					onSuccess: () => {
						navigation.goBack();
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, POST_TYPE.POSTING],
						});
					},
					onError: error => {
						Toast.show({
							type: 'error',
							text1:
								error.response?.data.message || '게시물 업로드 오류입니다.',
							visibilityTime: 2000,
							position: 'bottom',
						});
						console.error(error.response);
					},
				},
			);
		}
	});

	const handleOnTempSaved = useThrottle(() => {
		postMutation.mutate(
			{
				title,
				content,
				postType: POST_TYPE.POSTING,
				imageKeys: uploadedImages,
				isDraft: true,
			},
			{
				onSuccess: () => {
					navigation.goBack();
				},
				onError: error => {
					Toast.show({
						type: 'error',
						text1: error.response?.data.message || '게시물 업로드 오류입니다.',
						visibilityTime: 2000,
						position: 'bottom',
					});
					console.error(error.response);
				},
			},
		);
	});

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
						titlePlaceholder={t(`다양한 이야기를 공유해보세요!`)}
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
						{postMutation?.isPending || updatePostMutation?.isPending ? (
							<ActivityIndicator />
						) : (
							<>
								{!isEdit && (
									<Pressable
										style={styles.menuBtn}
										onPress={handleOnTempSaved}
										disabled={postMutation.isPending}
									>
										<Text style={styles.menuText}>{t('임시저장')}</Text>
									</Pressable>
								)}
								<Pressable
									style={styles.menuBtn}
									onPress={handleOnSubmit}
									disabled={postMutation.isPending}
								>
									<Text style={styles.menuText}>{t('게시하기')}</Text>
								</Pressable>
							</>
						)}
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

export default CommunityPostingWriteScreen;
