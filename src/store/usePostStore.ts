import { create } from 'zustand';
import { POST_DETAIL_DATA } from '@/types/api/types';

interface IPostStore {
	post: POST_DETAIL_DATA | null;
	setPost: (post: POST_DETAIL_DATA | null) => void;
}

const usePostStore = create<IPostStore>(set => ({
	post: null,
	setPost: (post: POST_DETAIL_DATA | null) => {
		set({ post });
	},
}));

export default usePostStore;
