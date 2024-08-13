import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useParty from '@/hooks/queries/useParty';
import useModal from '@/hooks/useModal';
import usePopOver from '@/hooks/usePopOver';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomPopOver from '../common/CustomPopOver';
import ReportPartyModal from './ReportPartyModal';

function PartyDetailLeftHeader({ id }: { id: number }) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { isOpen, handlePopOver } = usePopOver();
	const { reportPartyMutation } = useParty();
	const {
		isVisible: reportIsVisible,
		show: reportShow,
		hide: reportHide,
	} = useModal();

	const handleReport = () => {
		reportPartyMutation.mutate(
			{
				partyId: id,
				reportContent: '',
			},
			{
				onSuccess: data => {
					console.log(data);
				},
				onError: error => {
					console.log(error);
				},
			},
		);
	};

	const menuList = [
		{
			name: '모집 상태 수정',
			onPress: () => {
				console.log('모집 상태 수정');
			},
		},
		{
			name: '수정하기',
			onPress: () => {
				console.log('수정하기');
			},
		},
		{
			name: '삭제하기',
			onPress: () => {
				console.log('삭제하기');
			},
		},
		{
			name: '신고하기',
			onPress: reportShow,
		},
	];

	const handleClickShare = () => {
		console.log('click share');
	};

	const handleClickMenu = () => {
		handlePopOver();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.8} onPress={handleClickShare}>
				<Ionicons name="share-outline" size={25} color={colors[theme].BLACK} />
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.8} onPress={handleClickMenu}>
				<Ionicons
					name="ellipsis-vertical"
					size={25}
					color={colors[theme].BLACK}
				/>
			</TouchableOpacity>
			<CustomPopOver
				menu={menuList}
				bottom={-140}
				right={15}
				isVisible={isOpen}
			/>
			<ReportPartyModal
				hideOption={reportHide}
				onSubmit={() => {
					handleReport();
					reportHide();
					Toast.show({
						type: 'success',
						text1: '신고가 완료되었습니다.',
						visibilityTime: 2000,
						position: 'bottom',
					});
					handlePopOver();
				}}
				isVisible={reportIsVisible}
			/>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 5,
			paddingHorizontal: 10,
		},
	});

export default PartyDetailLeftHeader;
