import { useMutation } from '@tanstack/react-query';
import { verificationMail, postMail } from '@/api/mail';
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
			console.log(data);
		},
		...mutationOptions,
	});
}

function useMail() {
	const postMailMutation = usePostMail();
	const verificationMailMutation = useVerificationMail();

	return { postMailMutation, verificationMailMutation };
}

export default useMail;
