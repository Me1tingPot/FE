import { useCallback, useState } from 'react';
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import IconCircleButton from '@/components/common/IconCircleButton';
import PostingPreview from '@/components/community/PostingPreview';
import { colors, communityNavigations } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityPostingScreenProps = {
	navigation: NavigationProp<CommunityStackParamList>;
};

const CommunityPostingScreen = ({
	navigation,
}: CommunityPostingScreenProps) => {
	const [refreshing, setRefreshing] = useState(false);

	const { theme } = useThemeStore();
	const styles = styling(theme);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="light-content"
				backgroundColor={colors[theme].WHITE}
			/>
			<View style={styles.contentContainer}>
				<ScrollView
					contentContainerStyle={styles.scrollStyle}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[colors[theme].BLACK]}
							tintColor={colors[theme].BLACK}
						/>
					}
				>
					{new Array(10).fill(null).map((_, idx) => (
						<PostingPreview key={idx} navigation={navigation} id={idx} />
					))}
				</ScrollView>
			</View>
			<View style={styles.buttonList}>
				<IconCircleButton
					family="Octicons"
					name="pencil"
					color={colors[theme].WHITE}
					size={30}
					onPress={() =>
						navigation.navigate(communityNavigations.COMMUNITY_POSTING_WRITE)
					}
				/>
			</View>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			paddingHorizontal: 20,
			paddingVertical: 30,
		},
		scrollStyle: {
			display: 'flex',
			flexDirection: 'column',
			gap: 15,
		},
		buttonList: {
			position: 'absolute',
			bottom: 30,
			right: 15,
		},
	});

export default CommunityPostingScreen;
