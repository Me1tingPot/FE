import { PropsWithChildren, ReactNode, createContext, useContext } from 'react';
import {
	GestureResponderEvent,
	Modal,
	ModalProps,
	Pressable,
	PressableProps,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface OptionContextValue {
	onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
	children: ReactNode;
	hideOption: () => void;
	isVisible: boolean;
	animationType?: ModalProps['animationType'];
}

function OptionMain({
	children,
	hideOption,
	isVisible,
	animationType = 'fade',
}: OptionMainProps) {
	const onClickOutSide = (e: GestureResponderEvent) => {
		if (e.target === e.currentTarget) hideOption();
	};
	return (
		<Modal
			onRequestClose={hideOption}
			visible={isVisible}
			transparent={true}
			animationType={animationType}
		>
			<OptionContext.Provider value={{ onClickOutSide }}>
				{children}
			</OptionContext.Provider>
		</Modal>
	);
}

function Background({ children }: PropsWithChildren) {
	const optionContext = useContext(OptionContext);
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView
			style={styles.optionBackground}
			onTouchEnd={optionContext?.onClickOutSide}
		>
			{children}
		</SafeAreaView>
	);
}

function Container({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
	children: ReactNode;
	isDanger?: boolean;
	isChecked?: boolean;
}

function Button({
	children,
	isDanger = false,
	isChecked = false,
	...props
}: ButtonProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable
			style={({ pressed }) => [
				pressed && styles.optionButtonPressed,
				styles.optionButton,
			]}
			{...props}
		>
			<Text style={[styles.optionText, isDanger && styles.dangerText]}>
				{children}
			</Text>
			{isChecked && (
				<Ionicons name="checkmark" size={20} color={colors[theme].BLUE_500} />
			)}
		</Pressable>
	);
}

function Divider() {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return <View style={styles.optionBorder} />;
}

function Title({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.titleContainer}>
			<Text style={styles.titleText}>{children}</Text>
		</View>
	);
}

export const CompoundOption = Object.assign(OptionMain, {
	Container,
	Background,
	Button,
	Divider,
	Title,
});

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		optionBackground: {
			flex: 1,
			justifyContent: 'flex-end',
			backgroundColor: 'rgba(0 0 0 / 0.5)',
		},
		optionContainer: {
			borderRadius: 15,
			marginHorizontal: 15,
			marginBottom: 10,
			backgroundColor: colors[theme].WHITE,
			overflow: 'hidden',
		},
		optionButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			height: 55,
			gap: 5,
		},
		optionButtonPressed: {
			backgroundColor: colors[theme].GRAY_100,
		},
		optionText: {
			color: colors[theme].BLUE_500,
			fontSize: 18,
			fontWeight: '500',
		},
		dangerText: {
			color: colors[theme].RED_500,
		},
		optionBorder: {
			borderBottomColor: colors[theme].GRAY_200,
			borderBottomWidth: 1,
		},
		titleContainer: {
			alignItems: 'center',
			padding: 15,
		},
		titleText: {
			fontSize: 16,
			fontWeight: '500',
			color: colors[theme].GRAY_400,
		},
	});
