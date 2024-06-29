import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from './useAuth';
import { postChangeAlarmStatus } from '@/api/chat';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';

function useMutationPostChangeAlarms(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postChangeAlarmStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CHAT]
      })
    },
    ...mutationOptions,
  })
}

export default useMutationPostChangeAlarms;