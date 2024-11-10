import { useMutation } from '@tanstack/react-query';
import { reportPost } from '@/api/report';
import { UseMutationCustomOptions } from './useAuth';

function useReportPost(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: reportPost,
		onSuccess: data => {
			console.log(data);
		},
		...mutationOptions,
	});
}

const useReport = () => {
	const reportPostMutation = useReportPost();

	return {
		reportPostMutation,
	};
};

export default useReport;
