import { useMutation } from '@tanstack/react-query';
import { postMail } from '@/api/mail';
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

function useMail() {
	const postMailMutation = usePostMail();

	return { postMailMutation };
}

export default useMail;
