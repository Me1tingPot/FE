import React from 'react';
import { StyleSheet, View } from 'react-native';
import useModal from '@/hooks/useModal';
import { CompoundOption } from '../common/CompoundOption';

interface BaboProps {
	isVisible: boolean;
	hideOption: () => void;
}

const Babo = ({ isVisible, hideOption }: BaboProps) => {
	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Title>
						당신은 차다인을 선택하셔야만 합니다.
					</CompoundOption.Title>
					<CompoundOption.Divider />
					<CompoundOption.Button>차다인</CompoundOption.Button>
					<CompoundOption.Divider />
					<CompoundOption.Button>차다인</CompoundOption.Button>
					<CompoundOption.Divider />
					<CompoundOption.Button isChecked>차다인</CompoundOption.Button>
				</CompoundOption.Container>

				<CompoundOption.Container>
					<CompoundOption.Button isDanger onPress={hideOption}>
						취소하기
					</CompoundOption.Button>
				</CompoundOption.Container>
			</CompoundOption.Background>
		</CompoundOption>
	);
};

const styles = StyleSheet.create({});

export default Babo;
