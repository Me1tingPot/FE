import { API_URL } from "@/constants/path";
import axiosInstance from "./axios";
import { POST_TYPES } from "@/types/api";

export enum POST_TYPE {
   POSTING = 'POSTING',
   QUESTION ='QUESTION'
}

interface PostProps {
   title: string;
   content: string;
   postType: POST_TYPE;
   imageKeys: string[];
}

export interface GetPostsProps {
   postType?: POST_TYPE;
   cursor?: number;
   pageSize?: number;
}

const post = async ({title, content, postType, imageKeys}: PostProps) => {
   const { data } = await axiosInstance.post(`${API_URL.POST}`, {
      title,
      content,
      postType,
      imageKeys
   });
   return data;
}

const getPosts = async ({postType, cursor, pageSize}: GetPostsProps): Promise<POST_TYPES> => {
   const { data } = await axiosInstance.get(`${API_URL.GET_POSTS_LIST}/${postType}?cursor=${cursor}&pageSize=${pageSize}`)
   console.log('데이터: ', data);
   return data;
}

export { post, getPosts };