import { useMutation } from '@tanstack/react-query';
import { deleteChatRoom } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { UseMutationCustomOptions } from './useAuth';

function useMutationDeleteChatRooms(
	mutationOptions?: UseMutationCustomOptions,
) {
	return useMutation({
		mutationFn: deleteChatRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.CHAT],
			});
		},
		...mutationOptions,
	});
}

export default useMutationDeleteChatRooms;
