import { PropsWithChildren, ReactNode } from 'react';
import {
	Image,
	ImageProps,
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CardMainProps extends PressableProps {
	children: ReactNode;
}

function CardMain({ children, ...props }: CardMainProps) {
	return <Pressable {...props}>{children}</Pressable>;
}

function Container({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressedContainer,
			]}
		>
			{children}
		</Pressable>
	);
}

function Badge({ children }: PropsWithChildren) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<TouchableOpacity style={styles.badge} activeOpacity={0.8}>
			<Text style={styles.badgeText}>{children}</Text>
		</TouchableOpacity>
	);
}

interface ProfileProps extends ImageProps {
	uri?: string;
}

function Profile({ uri, ...props }: ProfileProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const defaultImage = require('@/assets/user-default.png');

	return (
		<Image
			style={styles.profile}
			source={uri ? { uri } : defaultImage}
			{...props}
		/>
	);
}

function TextContainer({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.textContainer}>
			<Text style={styles.titleText} numberOfLines={2}>
				{title}
			</Text>
			<Text style={styles.descText} numberOfLines={1}>
				{description}
			</Text>
		</View>
	);
}

function Divider() {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.dividerContainer}>
			<View style={styles.divider} />
		</View>
	);
}

function DetailInfo({ iconName, info }: { iconName: string; info: string }) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.iconContainer}>
			<Ionicons name={iconName} size={20} color={colors[theme].GRAY_500} />
			<Text style={styles.iconFont}>{info}</Text>
		</View>
	);
}

const CompoundCard = Object.assign(CardMain, {
	Container,
	Badge,
	Profile,
	TextContainer,
	Divider,
	DetailInfo,
});

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			height: 160,
			backgroundColor: colors[theme].WHITE,
			borderRadius: 20,
			borderColor: colors[theme].EMERALD_500,
			borderWidth: 4,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: {
				width: 0,
				height: 8,
			},
			shadowOpacity: 0.2,
			shadowRadius: 8.65,
			elevation: 8,
		},
		pressedContainer: {
			backgroundColor: colors[theme].GRAY_100,
		},
		badge: {
			width: 60,
			height: 25,
			backgroundColor: colors[theme].EMERALD_500,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			top: 5,
			left: 8,
			borderRadius: 12,
			overflow: 'hidden',
		},
		badgeText: {
			color: colors[theme].WHITE,
			fontFamily: 'Pretendard-Bold',
			fontSize: 13,
		},
		profile: {
			width: 50,
			height: 50,
			borderRadius: 50,
			top: 10,
			left: 10,
		},
		textContainer: {
			flexDirection: 'column',
			marginTop: 10,
			marginLeft: 10,
		},
		titleText: {
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
		},
		descText: {
			color: colors[theme].GRAY_500,
			fontFamily: 'Pretendard-Light',
			fontSize: 10,
		},
		dividerContainer: {
			alignItems: 'center',
			marginVertical: 10,
		},
		divider: {
			borderBottomWidth: 1,
			width: '90%',
			borderBottomColor: colors[theme].GRAY_200,
		},
		iconContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 2,
		},
		iconFont: {
			color: colors[theme].GRAY_500,
			fontSize: 13,
		},
	});

export default CompoundCard;
