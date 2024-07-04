import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { CompoundModal } from '../common/CompoundModal';
import CustomTextInput from '../common/CustomTextInput';

interface ChangeProfileModalProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	isVisible: boolean;
	hideOption: () => void;
	onSubmit: () => void;
}

function ChangeProfileModal({
	value,
	setValue,
	isVisible,
	hideOption,
	onSubmit,
}: ChangeProfileModalProps) {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<CompoundModal isVisible={isVisible} hideOption={hideOption}>
			<CompoundModal.Background>
				<CompoundModal.Container>
					<CompoundModal.ContentContainer>
						<View style={styles.container}>
							<Text style={styles.mainText}>
								{`${t('변경할 프로필 소개를 입력해주세요.')}`}
							</Text>
							<CustomTextInput
								value={value}
								onChangeText={t => setValue(t)}
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
	});

export default ChangeProfileModal;
