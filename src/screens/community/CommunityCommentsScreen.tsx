import { useCallback, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import InputBottom from '@/components/community/detail/InputBottom';
import CommentsView from '@/components/community/detail/comment/CommentsView';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CommunityCommentsScreenProps {
	route: {
		params: {
			id: number;
		};
	};
}

const CommunityCommentsScreen = ({ route }: CommunityCommentsScreenProps) => {
	const { id } = route.params;
	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState('');
	const [refreshing, setRefreshing] = useState(false);

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
					<View style={styles.commentLayout}>
						{new Array(3).fill(null).map((_, idx) => (
							<CommentsView key={idx} />
						))}
					</View>
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
			gap: 10,
			paddingVertical: 10,
			paddingHorizontal: 20,
		},
		keyboardView: {
			flex: 1,
		},
		commentLayout: {
			gap: 10,
			paddingHorizontal: 10,
		},
	});

export default CommunityCommentsScreen;
