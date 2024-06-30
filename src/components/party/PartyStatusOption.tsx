import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CompoundOption } from '../common/CompoundOption';

interface PartyStatusOptionProps {
	isVisible: boolean;
	hideOption: () => void;
}

function PartyStatusOption({ isVisible, hideOption }: PartyStatusOptionProps) {
	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button>모집 중</CompoundOption.Button>
					<CompoundOption.Button>모집 예정</CompoundOption.Button>
					<CompoundOption.Button>마감</CompoundOption.Button>
					<CompoundOption.Button isDanger>취소</CompoundOption.Button>
				</CompoundOption.Container>
			</CompoundOption.Background>
		</CompoundOption>
	);
}

const styles = StyleSheet.create({});

export default PartyStatusOption;
