import { API_URL } from '@/constants/path';
import { POST_COMMENT_TYPES, POST_DATAIL_TYPES, POST_TYPES } from '@/types/api';
import axiosInstance from './axios';

export enum POST_TYPE {
	POSTING = 'POSTING',
	QUESTION = 'QUESTION',
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

interface GetPostDetailProps {
	postId: number;
}

const post = async ({ title, content, postType, imageKeys }: PostProps) => {
	const { data } = await axiosInstance.post(`${API_URL.POST}`, {
		title,
		content,
		postType,
		imageKeys,
	});
	return data;
};

const getPosts = async ({
	postType,
	cursor,
	pageSize,
}: GetPostsProps): Promise<POST_TYPES> => {
	const { data } = await axiosInstance.get(
		`${API_URL.GET_POSTS_LIST}/${postType}?cursor=${cursor}&pageSize=${pageSize}`,
	);
	console.log('데이터: ', data);
	return data;
};

const getPostDetail = async ({
	postId,
}: GetPostDetailProps): Promise<POST_DATAIL_TYPES> => {
	const { data } = await axiosInstance.get(
		`${API_URL.GET_POST_DETAIL}/${postId}?cursor=1&pageSize=1`,
	);
	return data;
};

const getGetPostComment = async ({
	postId,
	cursor,
	pageSize,
}: {
	postId: number;
	cursor: number;
	pageSize: number;
}): Promise<POST_COMMENT_TYPES> => {
	const { data } = await axiosInstance.get(
		`${API_URL.GET_COMMENTS_LIST}/${postId}?cursor=${cursor}&pageSize=${pageSize}`,
	);

	return data;
};

export { post, getPosts, getPostDetail, getGetPostComment };
