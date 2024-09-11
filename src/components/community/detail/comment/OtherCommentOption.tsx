import { useTranslation } from 'react-i18next';
import { CompoundOption } from '@/components/common/CompoundOption';
import { COMMENT_DTO } from '@/types/api/types';

interface CommentOptionProps {
	isVisible: boolean;
	hideOption: () => void;
	targetComment?: COMMENT_DTO;
}

function OtherCommentOption({
	isVisible,
	hideOption,
	targetComment,
}: CommentOptionProps) {
	const { t } = useTranslation();

	const handleReportComment = () => {
		hideOption();
	};

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button onPress={handleReportComment}>
						{t('신고하기')}
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

export default OtherCommentOption;
