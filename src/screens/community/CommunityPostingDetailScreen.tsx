import { useCallback, useEffect, useState } from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';
import queryClient from '@/api/queryClient';
import InputBottom from '@/components/community/detail/InputBottom';
import PostContents from '@/components/community/detail/PostContents';
import PostInfo from '@/components/community/detail/PostInfo';
import UpdatePostOption from '@/components/community/detail/UpdatePostOption';
import CommentOption from '@/components/community/detail/comment/CommentOption';
import CommentsView from '@/components/community/detail/comment/CommentsView';
import CameraOrLibrary from '@/components/signup/CameraOrLibrary';
import { colors, queryKeys } from '@/constants';
import useComment from '@/hooks/queries/useComment';
import useCommunity from '@/hooks/queries/useCommunity';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import usePostStore from '@/store/usePostStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

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
	const [targetCommentId, setTargetCommentId] = useState<number | undefined>(
		undefined,
	);

	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const modal = useModal();
	const { setPost } = usePostStore();
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

	const onSubmit = async () => {
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
	};

	const handleCommentId = (id: number | null) => {
		setCommentId(id);
	};

	const handleWriteChildComment = async () => {
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
	};

	const cameraOptions: CameraOptions = {
		cameraType: 'front',
		mediaType: 'photo',
	};

	const libraryOptions: ImageLibraryOptions = {
		selectionLimit: 3,
		mediaType: 'photo',
	};

	if (isPending) {
		return <></>;
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
							setTargetCommentId={setTargetCommentId}
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
				/>
			</KeyboardAvoidingView>
			<CameraOrLibrary
				isVisible={modal.isVisible}
				hideOption={modal.hide}
				cameraOptions={cameraOptions}
				libraryOptions={libraryOptions}
				setFiles={setFiles}
			/>
			<UpdatePostOption
				isVisible={postingOption.isVisible}
				hideOption={postingOption.hide}
				postType={'Post'}
				navigation={navigation}
			/>
			<CommentOption
				isVisible={commentOption.isVisible}
				hideOption={commentOption.hide}
				targetCommentId={targetCommentId}
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
