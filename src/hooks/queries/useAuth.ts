import {
	UseMutationOptions,
	UseMutationResult,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login } from '@/api/auth';
import { LoginInputs } from '@/screens/auth/LoginScreen';
import { LOGIN_TYPES } from '@/types/api';

// function useSignup(mutationOptions?: UseMutationCustomOptions) {
//     return useMutation({
//       mutationFn: postSignup,
//       ...mutationOptions,
//     });
//   }

function useLogin(
	mutationOptions?: UseMutationOptions<LOGIN_TYPES, Error, LoginInputs>,
): UseMutationResult<LOGIN_TYPES, AxiosError, LoginInputs> {
	return useMutation<LOGIN_TYPES, AxiosError, LoginInputs>({
		mutationFn: ({ email, password }: LoginInputs) => login(email, password),
		...mutationOptions,
	});
}

export { useLogin };
