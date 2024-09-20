import { API_URL } from '@/constants/path';
import axiosInstance from './axios';

const reportPost = async ({
	postId,
	content,
}: {
	postId: number;
	content: string;
}) => {
	const { data } = await axiosInstance.post(`${API_URL.REPORT}/${postId}`, {
		content,
	});

	return data;
};

export { reportPost };
