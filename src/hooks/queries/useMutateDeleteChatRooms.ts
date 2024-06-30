import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from './useAuth';
import { deleteChatRoom } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';

function useMutationDeleteChatRooms (mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CHAT]
      })
    },
    ...mutationOptions,
  })
}

export default useMutationDeleteChatRooms;