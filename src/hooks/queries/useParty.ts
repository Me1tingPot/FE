import {
	InfiniteData,
	QueryKey,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import {
	createParty,
	deleteParty,
	getPartyData,
	getPartyImageUrl,
	getTempSavedParty,
	joinParty,
	reportParty,
	searchParty,
	searchPartyNearby,
	SearchPartyProps,
	updateParty,
} from '@/api/party';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import { PARTY_LISTS_TYPE } from '@/types/api';
import { UseMutationCustomOptions } from './useAuth';

// GET: 파티 정보 조회
function useGetParty(partyId: number) {
	const { data, error, isSuccess, isError, isPending } = useQuery({
		queryKey: [queryKeys.PARTY, partyId],
		queryFn: () => getPartyData(partyId),
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

// GET: 임시 저장된 파티 조회
function useGetTempSavedParty() {
	const { data, error, isSuccess, isError, isPending } = useQuery({
		queryKey: [queryKeys.PARTY],
		queryFn: getTempSavedParty,
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

// GET: 파티 이미지 URL 생성
function useGetPartyImageUrl() {
	const { data, error, isSuccess, isError, isPending } = useQuery({
		queryKey: [queryKeys.PARTY],
		queryFn: getPartyImageUrl,
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

// POST: 파티 생성
function useCreateParty(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: createParty,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// POST: 파티 신고
function useReportParty(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: reportParty,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// POST: 파티 참여
function useJoinParty(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: joinParty,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// POST: 파티 검색
function useSearchPartyInfiniteLIsts(
	partyData: SearchPartyProps,
	queryOptions?: UseInfiniteQueryOptions<
		PARTY_LISTS_TYPE,
		ResponseError,
		InfiniteData<PARTY_LISTS_TYPE, number>,
		PARTY_LISTS_TYPE,
		QueryKey,
		number
	>,
) {
	return useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			searchParty({
				page: pageParam,
				query: partyData.query,
				areaIdFilter: partyData.areaIdFilter,
				temporalFilter: partyData.temporalFilter,
				statusFilter: partyData.statusFilter,
				coordLeftTopFilter: partyData.coordLeftTopFilter,
				coordRightBottomFilter: partyData.coordRightBottomFilter,
			}),
		queryKey: [queryKeys.PARTY],
		initialPageParam: 1,
		getNextPageParam: (lastPage, _) => {
			console.log(lastPage);
			return undefined;
		},
		...queryOptions,
	});
}

// POST: 내 주변 파티 검색
// TODO: infiniteQuery로 변경
// function useSearchPartyNearby(mutationOptions?: UseMutationCustomOptions) {
// 	return useMutation({
// 		mutationFn: searchPartyNearby,
// 		onSuccess: data => {
// 			console.log(data);
// 		},
// 		...mutationOptions,
// 	});
// }

// PUT: 파티 수정
function useUpdateParty(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: updateParty,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// DELETE: 파티 삭제
function useDeleteParty(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: deleteParty,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

function useParty() {
	const createPartyMutation = useCreateParty();
	const reportPartyMutation = useReportParty();
	const joinPartyMutation = useJoinParty();
	const updatePartyMutation = useUpdateParty();
	const deletePartyMutation = useDeleteParty();

	return {
		useGetParty,
		useGetTempSavedParty,
		useGetPartyImageUrl,
		createPartyMutation,
		reportPartyMutation,
		joinPartyMutation,
		updatePartyMutation,
		deletePartyMutation,
		useSearchPartyInfiniteLIsts,
	};
}

export default useParty;
