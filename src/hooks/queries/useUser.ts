import {
	UseMutationOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addProfileImage, changeThumbnailImage } from '@/api';
import queryClient from '@/api/queryClient';
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
	const { data, error, isSuccess, isError, isPending } = useQuery({
		queryKey: [queryKeys.USER],
		queryFn: getUserProfile,
	});

	if (error) {
		console.error(error);
	}

	return { isSuccess, isError, data, isPending };
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
			queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
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
			queryClient.invalidateQueries({ queryKey: [queryKeys.USER] });
		},
		...mutationOptions,
	});
}

// PUT: 프로필 대표 이미지 변경하기
function useChangeThumbnailImage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: changeThumbnailImage,
		onSuccess: data => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: [queryKeys.USER, queryKeys.ACCOUNT_ID],
			});
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
			queryClient.invalidateQueries({
				queryKey: [queryKeys.USER, queryKeys.ACCOUNT_ID],
			});
		},
		...mutationOptions,
	});
}

// POST: 유저 프로필 이미지 추가
function usePostUserProfileImage(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: addProfileImage,
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
	const postUserProfileImage = usePostUserProfileImage();
	const changeThumbnailImageMutation = useChangeThumbnailImage();

	return {
		getUserProfile,
		getUserProfileImages,
		userBioMutation,
		userNameMutation,
		deleteUserProfileImgMutation,
		postUserProfileImage,
		changeThumbnailImageMutation,
	};
}

export default useUser;
