import { getChatContent, ResponseChatList } from '@/api/chat';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

function useGetInfiniteChatLists(
  queryOptions?: UseInfiniteQueryOptions<
    ResponseChatList, ResponseError, InfiniteData<ResponseChatList, number>,
    ResponseChatList,
    QueryKey,
    number
  >
) {

  return useInfiniteQuery({
    queryFn: ({pageParam}) => getChatContent({page: pageParam, size: 10, chatRoomId: 10}),
    queryKey: [queryKeys.CHAT],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  })
}

export default useGetInfiniteChatLists