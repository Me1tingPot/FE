import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { CompoundModal } from '../common/CompoundModal';

interface ChangeRevokeModalProps {
	onSubmit: () => void;
	isVisible: boolean;
	hideOption: () => void;
}

function ChangeRevokeModal({
	onSubmit,
	isVisible,
	hideOption,
}: ChangeRevokeModalProps) {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<CompoundModal isVisible={isVisible} hideOption={hideOption}>
			<CompoundModal.Background>
				<CompoundModal.Container>
					<CompoundModal.ContentContainer>
						<View style={styles.container}>
							<Text style={styles.mainText}>{`${t('멜팅팟 회원 탈퇴')}`}</Text>
							<Text style={styles.description}>
								{`${t('정말 탈퇴하시겠습니까?')}`} 🥺
							</Text>
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

export default ChangeRevokeModal;
