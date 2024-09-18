import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	TextInput,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import queryClient from '@/api/queryClient';
import CheckBox from '@/components/common/CheckBox';
import CustomButton from '@/components/common/CustomButton';
import { colors, communityNavigations, queryKeys } from '@/constants';
import useComment from '@/hooks/queries/useComment';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import useCommentStore from '@/store/useComment';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CommentEditScreenProps {
	navigation: NavigationProp<CommunityStackParamList>;
	route: RouteProp<CommunityStackParamList>;
}

function CommentEditScreen({ navigation, route }: CommentEditScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { comment } = useCommentStore();
	const { t } = useTranslation();

	const params = route?.params;
	const id = params?.id;
	const postType = params && 'postType' in params ? params.postType : undefined;
	const [editedComment, setEditedComment] = useState(comment?.content);
	const [editIsAnonymous, setEditIsAnonymous] = useState(
		comment?.isAnonymous || false,
	);
	const { updateCommentMutation } = useComment();

	const handleOnSubmit = () => {
		if (postType && id && editedComment && comment) {
			updateCommentMutation.mutate(
				{
					commentId: comment?.commentId,
					content: editedComment,
					isAnonymous: editIsAnonymous,
					imageKey: comment?.imageUrl,
				},
				{
					onSuccess: () => {
						if (postType === 'POSTING') {
							navigation.navigate(
								communityNavigations.COMMUNITY_POSTING_DETAIL,
								{
									id: id,
								},
							);
						} else if (postType === 'QUESTION') {
							navigation.navigate(
								communityNavigations.COMMUNITY_QUESTION_DETAIL,
								{
									id: id,
								},
							);
						}
						queryClient.invalidateQueries({
							queryKey: [queryKeys.POST],
						});
					},
					onError: error => {
						Toast.show({
							type: 'error',
							text1:
								error?.response?.data.message ||
								t('댓글 수정 중 오류가 발생했습니다.'),
							visibilityTime: 2000,
							position: 'bottom',
						});
					},
				},
			);
		} else {
			Toast.show({
				type: 'error',
				text1: t('댓글을 입력하세요'),
				visibilityTime: 2000,
				position: 'bottom',
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyBoardView}
				behavior={'padding'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
			>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.commentContainer}>
						<TextInput
							multiline
							onChangeText={text => setEditedComment(text)}
							value={editedComment}
						/>
					</View>

					<View style={[styles.rowGap5, styles.anonymousContainer]}>
						<CheckBox
							isChecked={editIsAnonymous}
							onPress={() => setEditIsAnonymous(prev => !prev)}
							children={
								<Text style={styles.anomynousText}>{`${t('익명')}`}</Text>
							}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			<View style={styles.buttonContainer}>
				<CustomButton
					label={t('댓글 수정')}
					onPress={handleOnSubmit}
					isLoading={updateCommentMutation.isPending}
				/>
			</View>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		keyBoardView: {
			flex: 1,
		},
		scrollContainer: {
			flex: 1,
			padding: 20,
			paddingBottom: 50,
			gap: 20,
		},
		commentContainer: {
			padding: 15,
			minHeight: 300,
			borderRadius: 10,
			borderWidth: 0.5,
			borderColor: colors[theme].GRAY_200,
			backgroundColor: colors[theme].GRAY_100,
			color: colors[theme].UNCHANGE_BLACK,
		},
		rowGap5: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			alignItems: 'center',
		},
		anonymousContainer: {
			marginLeft: 'auto',
		},
		anomynousText: {
			fontSize: 12,
			color: colors[theme].GRAY_700,
		},
		buttonContainer: {
			padding: 20,
			paddingTop: 0,
		},
	});

export default CommentEditScreen;
