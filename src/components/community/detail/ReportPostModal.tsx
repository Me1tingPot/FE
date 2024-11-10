import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { CompoundModal } from '@/components/common/CompoundModal';
import CustomTextInput from '@/components/common/CustomTextInput';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface ReportPostModal {
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
	onSubmit: () => void;
	isVisible: boolean;
	hideOption: () => void;
}

function ReportPostModal({
	onSubmit,
	isVisible,
	hideOption,
	content,
	setContent,
}: ReportPostModal) {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<CompoundModal isVisible={isVisible} hideOption={hideOption}>
			<CompoundModal.Background>
				<CompoundModal.Container>
					<CompoundModal.ContentContainer>
						<View style={styles.container}>
							<Text
								style={styles.mainText}
							>{`${t('신고 사유를 작성해주세요.')}`}</Text>
							<CustomTextInput
								value={content}
								onChangeText={t => setContent(t)}
								variant="none"
							/>
						</View>
					</CompoundModal.ContentContainer>
					<CompoundModal.ButtonRowContainer>
						<CompoundModal.Button isDanger onPress={hideOption}>
							{`${t('취소')}`}
						</CompoundModal.Button>
						<CompoundModal.Divider />
						<CompoundModal.Button
							onPress={onSubmit}
						>{`${t('확인')}`}</CompoundModal.Button>
					</CompoundModal.ButtonRowContainer>
				</CompoundModal.Container>
			</CompoundModal.Background>
		</CompoundModal>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			gap: 15,
			padding: 10,
		},
		mainText: {
			alignSelf: 'center',
			color: colors[theme].GRAY_700,
		},
		description: {
			alignSelf: 'center',
			fontSize: 12,
			color: colors[theme].GRAY_700,
		},
	});

export default ReportPostModal;
