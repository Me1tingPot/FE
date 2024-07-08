import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createParty,
	deleteParty,
	getPartyData,
	getPartyImageUrl,
	getTempSavedParty,
	joinParty,
	reportParty,
	updateParty,
} from '@/api/party';
import { queryKeys } from '@/constants';
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
		console.error(error.response);
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
	};
}

export default useParty;
