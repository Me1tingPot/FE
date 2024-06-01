import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { CompoundModal } from '../common/CompoundModal';

interface ChangeProfileModalProps {
	isVisible: boolean;
	hideOption: () => void;
}

const ChangeProfileModal = ({
	isVisible,
	hideOption,
}: ChangeProfileModalProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<CompoundModal isVisible={isVisible} hideOption={hideOption}>
			<CompoundModal.Background>
				<CompoundModal.Container>
					<CompoundModal.ContentContainer>
						<Text style={styles.mainText}>
							변경할 프로필 소개 내용을 입력해주세요.
						</Text>
					</CompoundModal.ContentContainer>
					<CompoundModal.ButtonRowContainer>
						<CompoundModal.Button isDanger>취소</CompoundModal.Button>
						<CompoundModal.Divider />
						<CompoundModal.Button>확인</CompoundModal.Button>
					</CompoundModal.ButtonRowContainer>
				</CompoundModal.Container>
			</CompoundModal.Background>
		</CompoundModal>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		mainText: {
			color: colors[theme].GRAY_700,
		},
	});

export default ChangeProfileModal;
