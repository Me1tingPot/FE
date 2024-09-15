import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import queryClient from '@/api/queryClient';
import { CompoundOption } from '@/components/common/CompoundOption';
import { communityNavigations, queryKeys } from '@/constants';
import useComment from '@/hooks/queries/useComment';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useCommentStore from '@/store/useComment';
import { COMMENT_DTO } from '@/types/api/types';

interface CommentOptionProps {
	isVisible: boolean;
	hideOption: () => void;
	targetComment?: COMMENT_DTO;
	navigation: NavigationProp<CommunityStackParamList>;
	postId?: number;
}

function CommentOption({
	isVisible,
	hideOption,
	targetComment,
	navigation,
	postId,
}: CommentOptionProps) {
	const { t } = useTranslation();
	const { deleteCommentMutation } = useComment();
	const { setComment } = useCommentStore();

	const handleUpdateComment = () => {
		hideOption();
		if (targetComment && postId) {
			setComment(targetComment);
			navigation.navigate(communityNavigations.COMMUNITY_COMMENT_EDIT, {
				id: postId,
			});
		}
	};

	const handleDeleteComment = async () => {
		if (targetComment?.commentId) {
			deleteCommentMutation.mutate(
				{
					commentId: targetComment?.commentId,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, queryKeys.COMMENT],
						});
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST],
						});
						hideOption();
					},
					onError: error => {
						console.log(error.response);
					},
				},
			);
		}
	};

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button onPress={handleUpdateComment}>
						{t('수정하기')}
					</CompoundOption.Button>
					<CompoundOption.Button onPress={handleDeleteComment}>
						{t('삭제하기')}
					</CompoundOption.Button>
				</CompoundOption.Container>
				<CompoundOption.Container>
					<CompoundOption.Button onPress={hideOption}>
						{t('취소')}
					</CompoundOption.Button>
				</CompoundOption.Container>
			</CompoundOption.Background>
		</CompoundOption>
	);
}

export default CommentOption;
