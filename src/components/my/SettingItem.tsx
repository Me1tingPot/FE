import { ReactNode } from 'react';
import {
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface SettingItemProps extends PressableProps {
	title: string;
	subTitle?: string;
	icon?: ReactNode;
	color?: string;
}

const SettingItem = ({
	title,
	subTitle,
	icon = null,
	color,
	...props
}: SettingItemProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressedContainer,
			]}
			{...props}
		>
			{icon}
			<View style={styles.titleContainer}>
				<Text
					style={[styles.titleText, { color: color ?? colors[theme].BLACK }]}
				>
					{title}
				</Text>
				{subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
			</View>
		</Pressable>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10,
			paddingVertical: 15,
			backgroundColor: colors[theme].WHITE,
			paddingHorizontal: 10,
			borderColor: colors[theme].GRAY_500,
		},
		pressedContainer: {
			backgroundColor: colors[theme].GRAY_100,
			borderRadius: 10,
			overflow: 'hidden',
		},
		titleContainer: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		titleText: {
			fontSize: 16,
			fontFamily: 'Pretendard-Medium',
			color: colors[theme].BLACK,
		},
		subTitleText: {
			color: colors[theme].GRAY_500,
		},
	});

export default SettingItem;
