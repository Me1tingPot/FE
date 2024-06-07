import {
	UseMutationOptions,
	UseMutationResult,
	useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login, signup, signupProps } from '@/api/auth';
import axiosInstance from '@/api/axios';
import { LoginInputs } from '@/screens/auth/LoginScreen';
import { LOGIN_TYPES, SIGNUP_TYPES } from '@/types/api';
import { setEncryptStorage, setHeader } from '@/utils';

function useSignup(
	mutationOptions?: UseMutationOptions<SIGNUP_TYPES, AxiosError, signupProps>,
): UseMutationResult<SIGNUP_TYPES, AxiosError, signupProps> {
	return useMutation<SIGNUP_TYPES, AxiosError, signupProps>({
		mutationFn: ({ ...signupProps }: signupProps) => signup({ ...signupProps }),
		...mutationOptions,
	});
}

// function useLogin(
// 	mutationOptions?: UseMutationOptions<LOGIN_TYPES, AxiosError, LoginInputs>,
// ): UseMutationResult<LOGIN_TYPES, AxiosError, LoginInputs> {
// 	return useMutation<LOGIN_TYPES, AxiosError, LoginInputs>({
// 		mutationFn: ({ email, password }: LoginInputs) => login(email, password),
// 		...mutationOptions,
// 	});
// }

type CustomError = AxiosError<{
	message: string;
	statusCode: string;
	error: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
	UseMutationOptions<TData, CustomError, TVariables, unknown>,
	'mutationFn'
>;

function useLogin(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: login,
		onSuccess: data => {
			const accessToken = data.data.tokenDto.accessToken;
			const refreshToken = data.data.tokenDto.refreshToken;
			// 1. Storage에 RefreshToken
			setEncryptStorage('refreshToken', refreshToken);
			// 2. Storage에 AccessToke9
			setHeader('Authorization', accessToken);
		},
		...mutationOptions,
	});
}

function useAuth() {
	const signUpMutation = useSignup();
	const loginMutation = useLogin();

	return {
		signUpMutation,
		loginMutation,
	};
}

export default useAuth;
