import { Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type ChatHomeHeaderLeftProps = StackNavigationProp<FeedStackParamList>;

function ChatHomeHeaderLeft(navigation: ChatHomeHeaderLeftProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<Pressable style={styles.container} onPress={() => navigation.goBack()}>
			<Ionicons
				name="close-outline"
				size={30}
				color={colors[theme].UNCHANGE_BLACK}
			/>
		</Pressable>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			marginLeft: 10,
		},
	});

export default ChatHomeHeaderLeft;
