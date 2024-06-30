import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface SearchInputProps extends TextInputProps {
	onSubmit: () => void;
}

function SearchInput({ onSubmit, ...props }: SearchInputProps) {
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
				name="search"
				color={colors[theme].GRAY_700}
				size={20}
				onPress={onSubmit}
			/>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderColor: '#A5F2E1',
			borderWidth: 2,
			paddingHorizontal: 15,
			paddingVertical: 15,
			borderRadius: 40,
			width: '80%',
		},
		input: {
			flex: 1,
			fontSize: 16,
			paddingVertical: 0,
			paddingLeft: 0,
			color: colors[theme].BLACK,
		},
	});

export default SearchInput;
