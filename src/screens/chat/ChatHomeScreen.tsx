import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import NoneChatView from '@/components/chat/NoneChatView';
import PartyCard from '@/components/common/PartyCard';
import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface ChatHomeScreenProps {
	navigation: NavigationProp<FeedStackParamList>;
}

const chatList = [];

function ChatHomeScreen({ navigation }: ChatHomeScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={[
					styles.contentContainer,
					chatList.length === 0 && styles.flex,
				]}
			>
				{chatList.length > 0 ? (
					<View style={styles.chatContainer}>
						{new Array(10).fill(null).map((_, idx) => (
							<PartyCard
								key={idx}
								onPress={() =>
									navigation.navigate(feedNavigations.CHAT, { id: idx })
								}
							/>
						))}
					</View>
				) : (
					<NoneChatView navigation={navigation} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			paddingHorizontal: 20,
		},
		flex: {
			flex: 1,
		},
		chatContainer: {
			paddingVertical: 20,
			gap: 15,
		},
	});

export default ChatHomeScreen;
