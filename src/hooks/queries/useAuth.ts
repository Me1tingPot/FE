import {
	UseMutationOptions,
	UseMutationResult,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login, signup, signupProps } from '@/api/auth';
import { LoginInputs } from '@/screens/auth/LoginScreen';
import { LOGIN_TYPES, SIGNUP_TYPES } from '@/types/api';

function useSignup(
	mutationOptions?: UseMutationOptions<SIGNUP_TYPES, AxiosError, signupProps>,
): UseMutationResult<SIGNUP_TYPES, AxiosError, signupProps> {
	return useMutation<SIGNUP_TYPES, AxiosError, signupProps>({
		mutationFn: ({ ...signupProps }: signupProps) => signup({ ...signupProps }),
		...mutationOptions,
	});
}

function useLogin(
	mutationOptions?: UseMutationOptions<LOGIN_TYPES, AxiosError, LoginInputs>,
): UseMutationResult<LOGIN_TYPES, AxiosError, LoginInputs> {
	return useMutation<LOGIN_TYPES, AxiosError, LoginInputs>({
		mutationFn: ({ email, password }: LoginInputs) => login(email, password),
		...mutationOptions,
	});
}

export { useLogin, useSignup };
