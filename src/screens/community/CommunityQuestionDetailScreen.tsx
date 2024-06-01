import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from 'react-native';
import InputBottom from '@/components/community/detail/InputBottom';
import PostContents from '@/components/community/detail/PostContents';
import PostInfo from '@/components/community/detail/PostInfo';
import Comments from '@/components/community/detail/comment/Comments';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityQuestionDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
};

const CommunityQuestionDetailScreen = ({
	route,
}: CommunityQuestionDetailScreenProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyboardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<PostInfo />
					<PostContents />
					<Comments />
				</ScrollView>
				<InputBottom
					id={id}
					isChecked={isChecked}
					onPress={() => setIsChecked(prev => !prev)}
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
			flex: 1,
			padding: 20,
		},
		keyboardView: {
			flex: 1,
		},
	});

export default CommunityQuestionDetailScreen;
