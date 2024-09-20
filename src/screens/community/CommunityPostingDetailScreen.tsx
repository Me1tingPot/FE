import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';
import queryClient from '@/api/queryClient';
import InputBottom from '@/components/community/detail/InputBottom';
import OtherPostOption from '@/components/community/detail/OtherPostOption';
import PostContents from '@/components/community/detail/PostContents';
import PostInfo from '@/components/community/detail/PostInfo';
import ReportPostModal from '@/components/community/detail/ReportPostModal';
import UpdatePostOption from '@/components/community/detail/UpdatePostOption';
import CommentOption from '@/components/community/detail/comment/CommentOption';
import CommentsView from '@/components/community/detail/comment/CommentsView';
import OtherCommentOption from '@/components/community/detail/comment/OtherCommentOption';
import CommunityCommentSkeletonScreen from '@/components/community/skeleton/CommunityCommentSkeletonScreen';
import CommunityDetailSkeletonScreen from '@/components/community/skeleton/CommunityDetailSkeletonScreen';
import CameraOrLibrary from '@/components/signup/CameraOrLibrary';
import { colors, queryKeys } from '@/constants';
import useComment from '@/hooks/queries/useComment';
import useCommunity from '@/hooks/queries/useCommunity';
import useReport from '@/hooks/queries/useReport';
import useGetUserData from '@/hooks/useGetUserData';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import useThrottle from '@/hooks/useThrottle';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import usePostStore from '@/store/usePostStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { COMMENT_DTO } from '@/types/api/types';

type CommunityPostingDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
	navigation: NavigationProp<CommunityStackParamList>;
};

function CommunityPostingDetailScreen({
	route,
	navigation,
}: CommunityPostingDetailScreenProps) {
	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [files, setFiles] = useState<string[]>([]);
	const [commentId, setCommentId] = useState<number | null>(null);
	const [targetComment, setTargetComment] = useState<COMMENT_DTO | undefined>(
		undefined,
	);
	const [content, setContent] = useState('');

	const { t } = useTranslation();
	const { id: userId } = useGetUserData();
	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const modal = useModal();
	const { setPost } = usePostStore();
	const { reportPostMutation } = useReport();
	const reportModal = useModal();
	const postingOption = useModal();
	const commentOption = useModal();

	const { useGetPostDetail } = useCommunity();
	const { useGetInfinitePostComments, commentMutation, childCommentMutation } =
		useComment();
	const { data, refetch, isPending } = useGetPostDetail(id);

	const {
		data: comments,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		refetch: refetchComment,
	} = useGetInfinitePostComments(id);

	usePermission('CAMERA');
	usePermission('PHOTO');

	useEffect(() => {
		if (data) {
			setPost(data?.data);
		}
	}, [setPost, data]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			refetch();
			refetchComment();
			setRefreshing(false);
		}, 2000);
	}, []);

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	const onSubmit = useThrottle(async () => {
		if (comment && data?.data) {
			commentMutation.mutate(
				{
					postId: data.data.postId,
					content: comment,
					isAnonymous: isChecked,
					imageKey: null,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, queryKeys.COMMENT, data?.data.postId],
						});
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, data?.data.postId],
						});
						setComment('');
						setIsChecked(false);
					},
					onError: error => {
						Toast.show({
							type: 'error',
							text1: error.response?.data.message || '댓글 업로드 오류입니다.',
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
				},
			);
		} else {
			Toast.show({
				type: 'error',
				text1: '댓글을 작성해주세요.',
				visibilityTime: 2000,
				position: 'bottom',
			});
		}
	});

	const handleCommentId = (id: number | null) => {
		setCommentId(id);
	};

	const handleWriteChildComment = useThrottle(async () => {
		if (comment && data?.data && commentId) {
			childCommentMutation.mutate(
				{
					commentId,
					content: comment,
					isAnonymous: isChecked,
					imageKey: null,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, queryKeys.COMMENT, data?.data.postId],
						});
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, data?.data.postId],
						});
						setCommentId(null);
						setComment('');
						setIsChecked(false);
					},
					onError: error => {
						console.log(error.response);
						Toast.show({
							type: 'error',
							text1:
								error.response?.data.message || '대댓글 업로드 오류입니다.',
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
				},
			);
		}
	});

	const handleReportPost = useThrottle(() => {
		if (data?.data?.postId && content) {
			reportPostMutation.mutate(
				{
					postId: data?.data?.postId,
					content,
				},
				{
					onSuccess: () => {
						Toast.show({
							type: 'success',
							text1: t('신고가 완료되었습니다.'),
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
					onError: error => {
						console.log(error?.response);
						Toast.show({
							type: 'error',
							text1:
								error?.response?.data?.message ||
								t('신고 중 에러가 발생했습니다.'),
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
					onSettled: () => {
						reportModal.hide();
					},
				},
			);
		}
	});

	const cameraOptions: CameraOptions = {
		cameraType: 'front',
		mediaType: 'photo',
	};

	const libraryOptions: ImageLibraryOptions = {
		selectionLimit: 3,
		mediaType: 'photo',
	};

	if (isPending) {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					scrollEnabled={false}
					data={Array(5).fill(null)}
					contentContainerStyle={styles.contentContainer}
					ListHeaderComponent={
						<View style={styles.postInfoContainer}>
							<CommunityDetailSkeletonScreen />
						</View>
					}
					renderItem={() => <CommunityCommentSkeletonScreen />}
				/>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyboardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<FlatList
					data={comments?.pages.flatMap(page => page.data.commentsList)}
					contentContainerStyle={styles.contentContainer}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[colors[theme].BLACK]}
							tintColor={colors[theme].BLACK}
						/>
					}
					ListHeaderComponent={
						<View style={styles.postInfoContainer}>
							<PostInfo
								writerName={data?.data.name}
								postDate={data?.data.updatedAt}
								show={postingOption.show}
							/>
							<PostContents
								title={data?.data.title}
								content={data?.data.content}
								commentCount={data?.data.commentCount}
							/>
						</View>
					}
					renderItem={({ item }) => (
						<CommentsView
							comment={item}
							show={commentOption.show}
							setCommentId={(id: number | null) => handleCommentId(id)}
							commentId={commentId}
							setTargetComment={setTargetComment}
						/>
					)}
					onEndReached={handleEndReached}
				/>
				<InputBottom
					id={id}
					isChecked={isChecked}
					onPress={() => setIsChecked(prev => !prev)}
					comment={comment}
					setComment={setComment}
					onSubmit={commentId ? handleWriteChildComment : onSubmit}
					onPressCamera={modal.show}
					isLoading={
						commentMutation.isPending || childCommentMutation.isPending
					}
				/>
			</KeyboardAvoidingView>
			<CameraOrLibrary
				isVisible={modal.isVisible}
				hideOption={modal.hide}
				cameraOptions={cameraOptions}
				libraryOptions={libraryOptions}
				setFiles={setFiles}
			/>
			{userId === data?.data?.userId ? (
				<UpdatePostOption
					isVisible={postingOption.isVisible}
					hideOption={postingOption.hide}
					postType={'Post'}
					navigation={navigation}
				/>
			) : (
				<OtherPostOption
					isVisible={postingOption.isVisible}
					hideOption={postingOption.hide}
					onPress={reportModal.show}
				/>
			)}
			{userId === targetComment?.userId ? (
				<CommentOption
					isVisible={commentOption.isVisible}
					hideOption={commentOption.hide}
					targetComment={targetComment}
					navigation={navigation}
					postId={data?.data.postId}
					postType="POSTING"
				/>
			) : (
				<OtherCommentOption
					isVisible={commentOption.isVisible}
					hideOption={commentOption.hide}
					targetComment={targetComment}
				/>
			)}
			<ReportPostModal
				content={content}
				setContent={setContent}
				onSubmit={handleReportPost}
				isVisible={reportModal.isVisible}
				hideOption={reportModal.hide}
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
		contentContainer: {
			gap: 10,
		},
		keyboardView: {
			flex: 1,
		},
		postInfoContainer: {
			gap: 15,
			padding: 20,
		},
	});

export default CommunityPostingDetailScreen;
