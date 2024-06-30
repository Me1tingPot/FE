import { getChatsList, ResponseChatRoom } from '@/api/chat';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

function useGetInfiniteChatLists(
  queryOptions?: UseInfiniteQueryOptions<
    ResponseChatRoom, ResponseError, InfiniteData<ResponseChatRoom, number>,
    ResponseChatRoom,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getChatsList({ page: pageParam, size: 5 }),
    queryKey: [queryKeys.CHAT],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  })
}

export default useGetInfiniteChatLists;