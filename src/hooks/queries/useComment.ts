import {
	InfiniteData,
	QueryKey,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useMutation,
} from '@tanstack/react-query';
import {
	deleteComment,
	getGetPostComment,
	updateComment,
	writeChildComment,
	writeComment,
} from '@/api/community';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import { POST_COMMENT_TYPES } from '@/types/api';
import { UseMutationCustomOptions } from './useAuth';

// GET: 커뮤니티 댓글 가져오기
function useGetInfinitePostComments(
	postId: number,
	queryOptions?: UseInfiniteQueryOptions<
		POST_COMMENT_TYPES,
		ResponseError,
		InfiniteData<POST_COMMENT_TYPES, number>,
		POST_COMMENT_TYPES,
		QueryKey,
		number
	>,
) {
	return useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			getGetPostComment({
				postId,
				cursor: pageParam,
				pageSize: 10,
			}),
		queryKey: [queryKeys.POST, queryKeys.COMMENT, postId],
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			return lastPage.data.isLast ? undefined : lastPage.data.nextCursor;
		},
		...queryOptions,
	});
}

// POST: 댓글 작성하기
function useWriteComment(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: writeComment,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// POST: 대댓글 작성하기
function useWriteChildComment(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: writeChildComment,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// DELETE: 댓글 삭제하기
function useDeleteComment(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: deleteComment,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// PUT: 댓글 수정하기
function useUpdateComment(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: updateComment,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

function useComment() {
	const commentMutation = useWriteComment();
	const childCommentMutation = useWriteChildComment();
	const deleteCommentMutation = useDeleteComment();
	const updateCommentMutation = useUpdateComment();

	return {
		commentMutation,
		childCommentMutation,
		deleteCommentMutation,
		updateCommentMutation,
		useGetInfinitePostComments,
	};
}

export default useComment;
