import {
	InfiniteData,
	QueryKey,
	UseInfiniteQueryOptions,
	useInfiniteQuery,
	useMutation,
} from '@tanstack/react-query';
import { POST_TYPE, getPosts, post } from '@/api/community';
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

function useCommunity() {
	const postMutation = usePost();

	return {
		postMutation,
		useGetInfiniteQuestionPostLists,
		useGetInfinitePostingPostLists,
	};
}

export default useCommunity;
