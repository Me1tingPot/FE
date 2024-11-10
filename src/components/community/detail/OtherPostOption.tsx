import { useTranslation } from 'react-i18next';
import { CompoundOption } from '@/components/common/CompoundOption';
import useThrottle from '@/hooks/useThrottle';

interface OtherPostOptionProps {
	isVisible: boolean;
	hideOption: () => void;
	onPress: () => void;
}

function OtherPostOption({
	isVisible,
	hideOption,
	onPress,
}: OtherPostOptionProps) {
	const { t } = useTranslation();

	const handleReportPost = useThrottle(() => {
		hideOption();
		onPress();
	});

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button onPress={handleReportPost}>
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

export default OtherPostOption;
