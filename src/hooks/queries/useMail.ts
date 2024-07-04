import { useMutation } from '@tanstack/react-query';
import { verificationMail, postMail, duplicationMail } from '@/api/mail';
import { UseMutationCustomOptions } from './useAuth';

function usePostMail(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: postMail,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

function useVerificationMail(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: verificationMail,
		onSuccess: data => {
			// console.log(data);
		},
		...mutationOptions,
	});
}

function useDuplicationMail(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: duplicationMail,
		onSuccess: data => {
			// console.log(data);
		},
		...mutationOptions,
	});
}

function useMail() {
	const postMailMutation = usePostMail();
	const verificationMailMutation = useVerificationMail();
	const duplicationMailMutation = useDuplicationMail();

	return {
		postMailMutation,
		verificationMailMutation,
		duplicationMailMutation,
	};
}

export default useMail;
