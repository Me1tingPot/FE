import { useTranslation } from 'react-i18next';
import { CompoundOption } from '@/components/common/CompoundOption';

interface CommentOptionProps {
	isVisible: boolean;
	hideOption: () => void;
}

function CommentOption({ isVisible, hideOption }: CommentOptionProps) {
	const { t } = useTranslation();

	const handleDeleteComment = () => {};

	const handleUpdateComment = () => {};

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
