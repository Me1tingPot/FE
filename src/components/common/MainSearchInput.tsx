import React from 'react';
import {
	Dimensions,
	StyleSheet,
	TextInput,
	TextInputProps,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface MainSearchInputProps extends TextInputProps {
	onSubmit: () => void;
}

const MainSearchInput = ({ onSubmit, ...props }: MainSearchInputProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				autoCapitalize="none"
				placeholderTextColor={colors[theme].GRAY_500}
				returnKeyType="search"
				onSubmitEditing={onSubmit}
				clearButtonMode="while-editing"
				{...props}
			/>
			<Ionicons
				name={'search'}
				color={colors[theme].GRAY_700}
				size={20}
				onPress={onSubmit}
			/>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderColor: colors[theme].GRAY_500,
			backgroundColor: colors[theme].WHITE,
			borderWidth: 2,
			paddingHorizontal: 15,
			paddingVertical: 15,
			borderRadius: 15,
			width: Dimensions.get('screen').width * 0.8,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: {
				width: 2,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		},
		input: {
			flex: 1,
			fontSize: 16,
			paddingVertical: 0,
			paddingLeft: 0,
			color: colors[theme].BLACK,
		},
	});

export default MainSearchInput;
