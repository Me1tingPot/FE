import React, {
	PropsWithChildren,
	ReactNode,
	createContext,
	useContext,
} from 'react';
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
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface ModalContextValue {
	onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalMainProps extends ModalProps {
	children: ReactNode;
	hideOption: () => void;
	isVisible: boolean;
	animationType?: ModalProps['animationType'];
}

function ModalMain({
	children,
	hideOption,
	isVisible,
	animationType = 'fade',
}: ModalMainProps) {
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
			style={styles.modalBackground}
			onTouchEnd={optionContext?.onClickOutSide}
		>
			{children}
		</SafeAreaView>
	);
}

function Container({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return <View style={styles.modalContainer}>{children}</View>;
}

function ContentContainer({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return <View style={styles.contentContainer}>{children}</View>;
}

function ButtonRowContainer({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return <View style={styles.modalButtonRowContainer}>{children}</View>;
}

function ButtonColumnContainer({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return <View style={styles.modalButtonColumnContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
	children: ReactNode;
	isDanger?: boolean;
}

function Button({ children, isDanger = false, ...props }: ButtonProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable
			style={({ pressed }) => [
				pressed && styles.modalButtonPressed,
				styles.modalButton,
			]}
			{...props}
		>
			<Text style={[styles.modalText, isDanger && styles.dangerText]}>
				{children}
			</Text>
		</Pressable>
	);
}

function Divider() {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return <View style={styles.modalBorder} />;
}

export const CompoundModal = Object.assign(ModalMain, {
	Background,
	ContentContainer,
	Container,
	ButtonRowContainer,
	ButtonColumnContainer,
	Button,
	Divider,
});

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		modalBackground: {
			flex: 1,
			justifyContent: 'center',
			backgroundColor: 'rgba(0 0 0 / 0.5)',
			alignItems: 'center',
		},
		modalContainer: {
			borderRadius: 15,
			backgroundColor: colors[theme].WHITE,
			overflow: 'hidden',
			width: 250,
		},
		contentContainer: {
			padding: 10,
			flexDirection: 'column',
			justifyContent: 'center',
			borderBottomColor: colors[theme].GRAY_300,
			borderWidth: 0.4,
		},
		modalButtonRowContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			width: '100%',
		},
		modalButtonColumnContainer: {
			flexDirection: 'column',
			justifyContent: 'space-around',
			height: 100,
		},
		modalButton: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			height: 40,
			gap: 5,
			flex: 1,
		},
		modalButtonPressed: {
			backgroundColor: colors[theme].GRAY_100,
		},
		modalText: {
			color: colors[theme].BLUE_500,
			fontSize: 15,
			fontWeight: '500',
			fontFamily: 'Pretendard-Bold',
		},
		dangerText: {
			color: colors[theme].RED_500,
		},
		modalBorder: {
			borderWidth: 0.4,
			borderColor: colors[theme].GRAY_300,
		},
	});
