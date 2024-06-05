import React from 'react';
import {
	Dimensions,
	Image,
	Modal,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateWithSeparator } from '@/utils';

interface MarkerDetailModalProps {
	markerId: number | null;
	isVisible: boolean;
	hide: () => void;
}

const testImg =
	'https://images.unsplash.com/photo-1598724329065-8025181b5799?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const MarkerDetailModal = ({
	markerId,
	isVisible,
	hide,
}: MarkerDetailModalProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<Modal visible={isVisible} transparent={true} animationType="fade">
			<SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
				<Pressable
					style={styles.cardContainer}
					onPress={() => {
						// 상세 페이지 이동
					}}
				>
					<View style={styles.imageWrapper}>
						<Image
							style={styles.image}
							resizeMode="cover"
							source={{ uri: testImg }}
						/>
					</View>
					<View style={styles.cardInner}>
						<View style={styles.infoContainer}>
							<View style={styles.addressContainer}>
								<Octicons
									name="location"
									size={14}
									color={colors[theme].GRAY_500}
								/>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.addressText}
								>
									서울시 마포구 신촌로4길 22-12, 2층 달빛소리
								</Text>
							</View>
							<Text style={styles.titleText}>LP를 사랑하는 사람들의 MOIM</Text>
							<Text style={styles.dateText}>
								{getDateWithSeparator(new Date(), '.')}
							</Text>
						</View>
						<MaterialIcons
							name="arrow-forward-ios"
							size={20}
							color={colors[theme].BLACK}
						/>
					</View>
				</Pressable>
			</SafeAreaView>
		</Modal>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		optionBackground: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		cardContainer: {
			backgroundColor: colors[theme].WHITE,
			width: Dimensions.get('window').width * 0.9,
			borderRadius: 20,
			overflow: 'hidden',
		},
		imageWrapper: {
			width: '100%',
			height: Dimensions.get('window').height * 0.3,
		},
		image: {
			width: '100%',
			height: '100%',
		},
		cardInner: {
			padding: 20,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		infoContainer: {
			flex: 1,
			marginLeft: 10,
		},
		addressContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 5,
		},
		addressText: {
			color: colors[theme].GRAY_500,
			fontSize: 12,
			marginLeft: 5,
		},
		titleText: {
			color: colors[theme].BLACK,
			fontSize: 18,
			fontFamily: 'Pretendard-Bold',
			marginBottom: 5,
		},
		dateText: {
			fontSize: 14,
			fontFamily: 'Pretendard-Bold',
			color: colors[theme].EMERALD_500,
		},
	});

export default MarkerDetailModal;
