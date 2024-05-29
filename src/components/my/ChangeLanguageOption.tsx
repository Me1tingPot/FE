import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import i18n from '@/locales/i18n.config';
import { CompoundOption } from '../common/CompoundOption';

interface ChangeLanguageOptionProps {
	isVisible: boolean;
	hideOption: () => void;
}

const ChangeLanguageOption = ({
	isVisible,
	hideOption,
}: ChangeLanguageOptionProps) => {
	const { t } = useTranslation();

	const onChangeKorean = () => {
		i18n.changeLanguage('ko');
		hideOption();
	};

	const onChangeEnglish = () => {
		i18n.changeLanguage('en');
		hideOption();
	};

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button onPress={onChangeKorean}>
						{t('한국어')}
					</CompoundOption.Button>
					<CompoundOption.Button onPress={onChangeEnglish}>
						{t('영어')}
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
};

const styles = StyleSheet.create({});

export default ChangeLanguageOption;
