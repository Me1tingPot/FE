import { PropsWithChildren, ReactNode } from 'react';
import { PressableProps, StyleSheet, View } from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CardMainProps extends PressableProps {
	children: ReactNode;
}

function CardMain({ children }: CardMainProps) {
	return <>{children}</>;
}

function Container({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return <View style={styles.cardContainer}>{children}</View>;
}

export const CompoundCard = Object.assign(CardMain, { Container });

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		cardContainer: {
			borderRadius: 15,
			marginHorizontal: 15,
			marginBottom: 10,
			overflow: 'hidden',
		},
	});
