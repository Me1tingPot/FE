import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { CompoundModal } from '../common/CompoundModal';

interface ReportPartyModalProps {
	onSubmit: () => void;
	isVisible: boolean;
	hideOption: () => void;
}

function ReportPartyModal({
	onSubmit,
	isVisible,
	hideOption,
}: ReportPartyModalProps) {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<CompoundModal isVisible={isVisible} hideOption={hideOption}>
			<CompoundModal.Background>
				<CompoundModal.Container>
					<CompoundModal.ContentContainer>
						<View style={styles.container}>
							<Text>이 파티를 신고할까요?</Text>
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
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 10,
		},
	});

export default ReportPartyModal;
