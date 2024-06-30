import { useEffect } from 'react';
import {
	UseMutationOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAccessToken, login, logout, signup } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { headers, queryKeys, storageKeys } from '@/constants';
import {
	removeEncryptStorage,
	removeHeader,
	setEncryptStorage,
	setHeader,
} from '@/utils';

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

function useSignup(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: signup,
		...mutationOptions,
	});
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: login,
		onSuccess: data => {
			console.log(data)
			const accessToken = data.data.tokenDto.accessToken;
			const refreshToken = data.data.tokenDto.refreshToken;
			// 1. Storage에 RefreshToken
			setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
			setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
			// 2. Storage에 AccessToken
			setHeader(headers.AUTHORIZATION, `Bearer ${accessToken}`);
		},
		onSettled: () => {
			// mutation 완료 후 재 요청할 쿼리 목록
			// ['auth', 'getAccessToken']
			queryClient.refetchQueries({
				queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
			});
		},
		...mutationOptions,
	});
}

// RefreshToken
// AccessToken이 만료될떄 RefreshToken을 활용해서, AccessToken을 재발급
// 백엔드에서 준 만료시간은 30분
function useGetRefreshToken() {
	const { data, error, isSuccess, isError } = useQuery({
		queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
		queryFn: getAccessToken,
		// 30분 -> 2~3분 정도 빠르게
		staleTime: 1000 * 60 * 30 - 1000 * 60 * 2,
		// 시간 주기에 따라서, refetch를 하게 해주는 옵션
		refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 2,
		// 앱을 종료하지 않고, 다른 작업했다가 다시 들어오는 경우
		refetchOnReconnect: true,
		refetchIntervalInBackground: true,
	});

	useEffect(() => {
		if (isSuccess) {
			setHeader('Authorization', `Bearer ${data.data.accessToken}`);
			setEncryptStorage(storageKeys.REFRESH_TOKEN, data.data.refreshToken);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			removeHeader('Authorization');
			removeEncryptStorage(storageKeys.REFRESH_TOKEN);
		}
	}, [isError]);

	return { isSuccess, isError, error, data };
}

// Logout
function useLogout(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			removeHeader(headers.AUTHORIZATION);
			removeEncryptStorage(storageKeys.REFRESH_TOKEN);
			queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
		},
		...mutationOptions,
	});
}

function useAuth() {
	const signUpMutation = useSignup();
	const loginMutation = useLogin();
	const getNewAccessToken = useGetRefreshToken();
	const logoutMutation = useLogout();
	const isLogin = getNewAccessToken.isSuccess;

	return {
		signUpMutation,
		loginMutation,
		logoutMutation,
		getNewAccessToken,
		isLogin,
	};
}

export default useAuth;
