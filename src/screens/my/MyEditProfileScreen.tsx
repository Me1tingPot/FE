import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CompoundModal } from '@/components/common/CompoundModal';
import CustomTextInput from '@/components/common/CustomTextInput';
import ChangeProfileModal from '@/components/my/ChangeProfileModal';
import useModal from '@/hooks/useModal';

interface MyEditProfileScreenProps {}

const MyEditProfileScreen = ({}: MyEditProfileScreenProps) => {
	const compoundModal = useModal();
	return (
		<View>
			<ChangeProfileModal
				isVisible={!compoundModal.isVisible}
				hideOption={compoundModal.hide}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default MyEditProfileScreen;
