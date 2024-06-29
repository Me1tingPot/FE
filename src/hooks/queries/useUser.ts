import { UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUserProfile } from '@/api/user';
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

function useUser() {
	const getUserProfile = useGetUserProfileData();

	return {
		getUserProfile,
	};
}

export default useUser;
