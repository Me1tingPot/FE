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
	isDraft: boolean;
}

interface UpdatePostProps extends Omit<PostProps, 'isDraft'> {
	postId: number;
}

export interface GetPostsProps {
	postType?: POST_TYPE;
	cursor?: number;
	pageSize?: number;
}

interface GetPostDetailProps {
	postId: number;
}

interface writeCommentProps {
	postId: number;
	content: string;
	isAnonymous: boolean;
	imageKey: string | null;
}

interface writeChildCommentProps extends Omit<writeCommentProps, 'postId'> {
	commentId: number;
}

const post = async ({
	title,
	content,
	postType,
	imageKeys,
	isDraft,
}: PostProps) => {
	const { data } = await axiosInstance.post(
		`${API_URL.POST}?isDraft=${isDraft}`,
		{
			title,
			content,
			postType,
			imageKeys,
		},
	);
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

const updatePost = async ({
	postId,
	title,
	content,
	postType,
	imageKeys,
}: UpdatePostProps) => {
	const { data } = await axiosInstance.put(`${API_URL.POST}/${postId}`, {
		title,
		content,
		postType,
		imageKeys,
	});

	return data;
};

const deletePost = async ({ postId }: { postId: number }) => {
	const { data } = await axiosInstance.delete(`${API_URL.POST}/${postId}`);
	return data;
};

const getTempSavedPost = async ({}) => {
	const { data } = await axiosInstance.get(`${API_URL.GET_TEMP_SAVED_POST}`);
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

const writeComment = async ({
	postId,
	content,
	isAnonymous,
	imageKey,
}: writeCommentProps) => {
	const { data } = await axiosInstance.post(`${API_URL.COMMENT}/${postId}`, {
		content,
		isAnonymous,
		imageKey,
	});
	return data;
};

const writeChildComment = async ({
	commentId,
	content,
	isAnonymous,
	imageKey,
}: writeChildCommentProps) => {
	const { data } = await axiosInstance.post(
		`${API_URL.CHILD_COMMENT}/${commentId}`,
		{
			content,
			isAnonymous,
			imageKey,
		},
	);
	return data;
};

const deleteComment = async ({ commentId }: { commentId: number }) => {
	const { data } = await axiosInstance.delete(
		`${API_URL.COMMENT}/${commentId}`,
	);
	return data;
};

const updateComment = async ({
	commentId,
	content,
	isAnonymous,
	imageKey,
}: writeChildCommentProps) => {
	const { data } = await axiosInstance.put(`${API_URL.COMMENT}/${commentId}`, {
		content,
		isAnonymous,
		imageKey,
	});
	return data;
};

export {
	post,
	getPosts,
	getPostDetail,
	getGetPostComment,
	updatePost,
	deletePost,
	getTempSavedPost,
	writeComment,
	writeChildComment,
	deleteComment,
	updateComment,
};
