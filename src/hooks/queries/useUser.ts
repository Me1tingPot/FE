import {
	UseMutationOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
	changeUserBio,
	changeUserName,
	deleteUserProfileImg,
	getUserProfile,
	getUserProfileImages,
} from '@/api/user';
import { queryKeys } from '@/constants';

export type CustomError = AxiosError<{
	message: string;
	statusCode: string;
	error: string;
}>;

export type UseMutationCustomOptions<
	TData = unknown,
	TVariables = unknown,
> = Omit<
	UseMutationOptions<TData, CustomError, TVariables, unknown>,
	'mutationFn'
>;

// GET: 유저 프로필 정보 가져오기
function useGetUserProfileData() {
	const { data, error, isSuccess, isError } = useQuery({
		queryKey: [queryKeys.USER],
		queryFn: getUserProfile,
	});

	if (error) {
		console.error(error);
	}

	return { isSuccess, isError, data };
}

// GET: 유저 프로필 이미지 리스트 가져오기
function useGetUserProfileImages() {
	const { data, error, isSuccess, isError } = useQuery({
		queryKey: [queryKeys.USER, queryKeys.ACCOUNT_ID],
		queryFn: getUserProfileImages,
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError };
}

// PATCH: 유저 소개 수정하기
function useUserBio(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: changeUserBio,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// PATCH: 유저 이름 수정하기
function useUserName(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: changeUserName,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

// DELETE: 마이페이지 사용자 프로필 이미지 삭제
function useDeleteUserProfileImg(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: deleteUserProfileImg,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

function useUser() {
	const getUserProfile = useGetUserProfileData();
	const getUserProfileImages = useGetUserProfileImages();
	const userBioMutation = useUserBio();
	const userNameMutation = useUserName();
	const deleteUserProfileImgMutation = useDeleteUserProfileImg();

	return {
		getUserProfile,
		getUserProfileImages,
		userBioMutation,
		userNameMutation,
		deleteUserProfileImgMutation,
	};
}

export default useUser;
