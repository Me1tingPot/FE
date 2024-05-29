import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, useColorScheme } from 'react-native';
import useThemeStorage from '@/hooks/useThemeStorage';
import { CompoundOption } from '../common/CompoundOption';

interface DarkModeOptionProps {
	isVisible: boolean;
	hideOption: () => void;
}

const DarkModeOption = ({ isVisible, hideOption }: DarkModeOptionProps) => {
	const systemDefault = useColorScheme();
	const { theme, isSystem, setMode, setSystem } = useThemeStorage();
	const { t } = useTranslation();
	const handlePressLight = () => {
		setMode('light');
		setSystem(false);
		hideOption();
	};
	const handlePressDark = () => {
		setMode('dark');
		setSystem(false);
		hideOption();
	};
	const handlePressSystem = () => {
		setMode(systemDefault ?? 'light');
		setSystem(true);
		hideOption();
	};

	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					{/* 현재 어떤 모드를 선택했는지 알 수 없음 */}
					<CompoundOption.Button
						onPress={handlePressLight}
						isChecked={isSystem === false && theme === 'light'}
					>
						{t('라이트 모드')}
					</CompoundOption.Button>
					<CompoundOption.Button
						onPress={handlePressDark}
						isChecked={isSystem === false && theme === 'dark'}
					>
						{t('다크 모드')}
					</CompoundOption.Button>
					<CompoundOption.Button
						onPress={handlePressSystem}
						isChecked={isSystem === true}
					>
						{t('시스템 기본값 모드')}
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

export default DarkModeOption;
