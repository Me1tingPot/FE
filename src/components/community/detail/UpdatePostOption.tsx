import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';
import { POST_TYPE } from '@/api/community';
import queryClient from '@/api/queryClient';
import { CompoundOption } from '@/components/common/CompoundOption';
import { communityNavigations, queryKeys } from '@/constants';
import useCommunity from '@/hooks/queries/useCommunity';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import usePostStore from '@/store/usePostStore';

interface UpdatePostOptionProps {
	isVisible: boolean;
	hideOption: () => void;
	postType: 'Post' | 'Question';
	navigation: NavigationProp<CommunityStackParamList>;
}

function UpdatePostOption({
	isVisible,
	hideOption,
	postType,
	navigation,
}: UpdatePostOptionProps) {
	const { deletePostMutation } = useCommunity();
	const { t } = useTranslation();
	const { post } = usePostStore();

	const handleUpdatePost = () => {
		if (postType === 'Post') {
			navigation.navigate(communityNavigations.COMMUNITY_POSTING_WRITE);
			hideOption();
		} else if (postType === 'Question') {
			navigation.navigate(communityNavigations.COMMUNITY_QUESTION_WRITE);
			hideOption();
		}
	};

	const handleDeletePost = async () => {
		if (post?.postId) {
			deletePostMutation.mutate(
				{
					postId: post?.postId,
				},
				{
					onSuccess: () => {
						navigation.goBack();
						if (postType === 'Post') {
							queryClient.invalidateQueries({
								queryKey: [queryKeys.POST, POST_TYPE.POSTING],
							});
						} else if (postType === 'Question') {
							queryClient.invalidateQueries({
								queryKey: [queryKeys.POST, POST_TYPE.QUESTION],
							});
						}
					},
					onError: error => {
						Toast.show({
							type: 'error',
							text1:
								error?.response?.data.message ||
								'글 삭제 중 에러가 발생했습니다.',
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
				},
			);
		}
	};

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button onPress={handleUpdatePost}>
						{t('수정하기')}
					</CompoundOption.Button>
					<CompoundOption.Button onPress={handleDeletePost}>
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

export default UpdatePostOption;
