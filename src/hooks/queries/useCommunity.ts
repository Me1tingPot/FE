import { GetPostsProps, getPosts, post } from "@/api/community";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "./useAuth";
import { queryKeys } from "@/constants";

// POST: 게시물 작성하기
function usePost(mutationOptions?: UseMutationCustomOptions) {
   return useMutation({
      mutationFn: post,
      onSuccess: data => {
         console.log(data);
      },
      ...mutationOptions
   })
}

// GET: 커뮤니티 글 목록 조회
function useGetPosts({postType, cursor, pageSize}: GetPostsProps) {
   const { data, error, isSuccess, isError, isPending } = useQuery({
      queryKey: [queryKeys.POST, postType],
      queryFn: () => getPosts({postType, cursor, pageSize})
   });

   if (error) {
      console.log(error);
   }

   return { isSuccess, isError, data, isPending };
}

function useCommunity() {
   const postMutation = usePost();

   return {
      postMutation,
      useGetPosts
   }
}

export default useCommunity;