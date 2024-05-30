import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import SearchInput from '@/components/common/SearchInput';
import FeedHomeBox from '@/components/feed/FeedHomeBox';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

function FeedHomeScreen() {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const navigation = useNavigation();
	const handleMoveChatPage = () => {
		// TODO: Chat 페이지로 이동 navigation 타입 정의
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.searchContainer}>
				<SearchInput onSubmit={() => {}} placeholder="파티를 검색해 보세요!" />
			</View>
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.boxContainer}>
					<FeedHomeBox
						text1="파티 호스트가 되어 친구들을 모아보세요!"
						highlightText="파티"
						text2="참여하기"
					/>
					<FeedHomeBox
						text1="내 주변에서 열리는 글로벌 파티에 참여하세요!"
						highlightText="내 주변 파티"
						text2="둘러보기"
					/>
					<FeedHomeBox highlightText="예약" text2="된 일정" />
				</View>
			</ScrollView>
			<View style={styles.buttonList}>
				<IconCircleButton
					family="Ionicons"
					name="chatbubbles"
					color={colors[theme].WHITE}
					size={30}
					onPress={() => {}}
				/>
			</View>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		boxContainer: {
			width: '100%',
			alignItems: 'center',
			marginTop: 10,
			gap: 20,
		},
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
			alignItems: 'center',
			justifyContent: 'center',
		},
		scrollContainer: {
			flex: 1,
			width: '100%',
		},
		searchContainer: {
			marginTop: 30,
		},
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
	});

export default FeedHomeScreen;
