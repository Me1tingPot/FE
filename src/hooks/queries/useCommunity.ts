import {
	InfiniteData,
	QueryKey,
	UseInfiniteQueryOptions,
	useInfiniteQuery,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import {
	POST_TYPE,
	deletePost,
	getGetPostComment,
	getPostDetail,
	getPosts,
	post,
	updatePost,
} from '@/api/community';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import { POST_TYPES } from '@/types/api';
import { UseMutationCustomOptions } from './useAuth';

// POST: 게시물 작성하기
function usePost(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: post,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// GET: 커뮤니티 질문 글 목록 조회
function useGetInfiniteQuestionPostLists(
	queryOptions?: UseInfiniteQueryOptions<
		POST_TYPES,
		ResponseError,
		InfiniteData<POST_TYPES, number>,
		POST_TYPES,
		QueryKey,
		number
	>,
) {
	return useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			getPosts({
				postType: POST_TYPE.QUESTION,
				cursor: pageParam,
				pageSize: 10,
			}),
		queryKey: [queryKeys.POST, POST_TYPE.QUESTION],
		initialPageParam: 1,
		getNextPageParam: (lastPage, _) => {
			return lastPage.data.isLast ? undefined : lastPage.data.nextCursor;
		},
		...queryOptions,
	});
}

// GET: 커뮤니티 포스팅 글 목록 조회
function useGetInfinitePostingPostLists(
	queryOptions?: UseInfiniteQueryOptions<
		POST_TYPES,
		ResponseError,
		InfiniteData<POST_TYPES, number>,
		POST_TYPES,
		QueryKey,
		number
	>,
) {
	return useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			getPosts({
				postType: POST_TYPE.POSTING,
				cursor: pageParam,
				pageSize: 10,
			}),
		queryKey: [queryKeys.POST, POST_TYPE.POSTING],
		initialPageParam: 1,
		getNextPageParam: (lastPage, _) => {
			return lastPage.data.isLast ? undefined : lastPage.data.nextCursor;
		},
		...queryOptions,
	});
}

// 커뮤니티 게시글 조회
function useGetPostDetail(postId: number) {
	return useQuery({
		queryKey: [queryKeys.POST, postId],
		queryFn: () => getPostDetail({ postId }),
	});
}

// 커뮤니티 글 수정하기
function useUpdatePost(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: updatePost,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// 커뮤니티 글 삭제하기
function useDeletePost(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: deletePost,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// 임시 저장된 커뮤니티 글 가져오기
function useGetTempSavedPost(postId: number) {
	return useQuery({
		queryKey: [queryKeys.TEMP_SAVED, postId],
		queryFn: () => getPostDetail({ postId }),
	});
}

function useCommunity() {
	const postMutation = usePost();
	const updatePostMutation = useUpdatePost();
	const deletePostMutation = useDeletePost();

	return {
		postMutation,
		updatePostMutation,
		deletePostMutation,
		useGetInfiniteQuestionPostLists,
		useGetInfinitePostingPostLists,
		useGetPostDetail,
		useGetTempSavedPost,
	};
}

export default useCommunity;
