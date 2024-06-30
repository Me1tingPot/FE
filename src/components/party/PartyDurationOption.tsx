import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CompoundOption } from '../common/CompoundOption';

interface PartyDurationOptionProps {
	isVisible: boolean;
	hideOption: () => void;
}

function PartyDurationOption({
	isVisible,
	hideOption,
}: PartyDurationOptionProps) {
	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button>최근 일주일 내</CompoundOption.Button>
					<CompoundOption.Button>최근 한달 내</CompoundOption.Button>
					<CompoundOption.Button>최신순</CompoundOption.Button>
					<CompoundOption.Button>오래된 순</CompoundOption.Button>
					<CompoundOption.Button isDanger>취소</CompoundOption.Button>
				</CompoundOption.Container>
			</CompoundOption.Background>
		</CompoundOption>
	);
}

const styles = StyleSheet.create({});

export default PartyDurationOption;
