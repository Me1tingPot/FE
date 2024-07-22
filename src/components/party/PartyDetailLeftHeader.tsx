import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

function PartyDetailLeftHeader() {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const handleClickShare = () => {
		console.log('click share');
	};

	const handleClickMenu = () => {
		console.log('click menu');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.8} onPress={handleClickShare}>
				<Ionicons name="share-outline" size={25} color={colors[theme].BLACK} />
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.8} onPress={handleClickMenu}>
				<Ionicons
					name="ellipsis-vertical"
					size={20}
					color={colors[theme].BLACK}
				/>
			</TouchableOpacity>
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
