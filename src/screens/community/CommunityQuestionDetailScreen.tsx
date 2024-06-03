import { useCallback, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import InputBottom from '@/components/community/detail/InputBottom';
import PostContents from '@/components/community/detail/PostContents';
import PostInfo from '@/components/community/detail/PostInfo';
import Comments from '@/components/community/detail/comment/Comments';
import { colors } from '@/constants';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityQuestionDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
	navigation: NavigationProp<CommunityStackParamList>;
};

const CommunityQuestionDetailScreen = ({
	route,
	navigation,
}: CommunityQuestionDetailScreenProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState('');
	const [refreshing, setRefreshing] = useState(false);

	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const onSubmit = () => {
		console.log(comment, '익명 유무: ', isChecked);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyboardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<ScrollView
					contentContainerStyle={styles.contentContainer}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[colors[theme].BLACK]}
							tintColor={colors[theme].BLACK}
						/>
					}
				>
					<PostInfo />
					<PostContents />
					<Comments navigation={navigation} id={id} />
				</ScrollView>
				<InputBottom
					id={id}
					isChecked={isChecked}
					onPress={() => setIsChecked(prev => !prev)}
					comment={comment}
					setComment={setComment}
					onSubmit={onSubmit}
				/>
			</KeyboardAvoidingView>
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
			gap: 15,
			padding: 20,
		},
		keyboardView: {
			flex: 1,
		},
	});

export default CommunityQuestionDetailScreen;
