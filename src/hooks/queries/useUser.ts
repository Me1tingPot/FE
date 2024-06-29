import {
	UseMutationOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { changeUserBio, changeUserName, getUserProfile } from '@/api/user';
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

function useUserBio(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: changeUserBio,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

function useUserName(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: changeUserName,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

function useUser() {
	const getUserProfile = useGetUserProfileData();
	const userBioMutation = useUserBio();
	const userNameMutation = useUserName();

	return {
		getUserProfile,
		userBioMutation,
		userNameMutation,
	};
}

export default useUser;
