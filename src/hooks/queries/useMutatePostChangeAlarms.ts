import { useMutation } from '@tanstack/react-query';
import { postChangeAlarmStatus } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { UseMutationCustomOptions } from './useAuth';

function useMutationPostChangeAlarms(
	mutationOptions?: UseMutationCustomOptions,
) {
	return useMutation({
		mutationFn: postChangeAlarmStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.CHAT],
			});
		},
		...mutationOptions,
	});
}

export default useMutationPostChangeAlarms;
