import { create } from 'zustand';
import { COMMENT_DTO } from '@/types/api/types';

interface ICommentScore {
	comment: COMMENT_DTO | null;
	setComment: (comment: COMMENT_DTO | null) => void;
}

const useCommentStore = create<ICommentScore>(set => ({
	comment: null,
	setComment: (comment: COMMENT_DTO | null) => {
		set({ comment });
	},
}));

export default useCommentStore;
