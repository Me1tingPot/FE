import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import queryClient from '@/api/queryClient';
import { CompoundOption } from '@/components/common/CompoundOption';
import { queryKeys } from '@/constants';
import useComment from '@/hooks/queries/useComment';

interface CommentOptionProps {
	isVisible: boolean;
	hideOption: () => void;
	targetCommentId?: number;
}

function CommentOption({
	isVisible,
	hideOption,
	targetCommentId,
}: CommentOptionProps) {
	const { t } = useTranslation();
	const { deleteCommentMutation } = useComment();

	const handleUpdateComment = () => {};

	const handleDeleteComment = async () => {
		if (targetCommentId) {
			deleteCommentMutation.mutate(
				{
					commentId: targetCommentId,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST, queryKeys.COMMENT],
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
