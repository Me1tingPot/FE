import React from 'react';
import { View, Text } from 'react-native';
import useCommentStore from '@/store/useComment';

function CommentEditScreen() {
	const { comment } = useCommentStore();
	return (
		<View>
			<Text>댓글 수정</Text>
			<Text>{comment?.content}</Text>
		</View>
	);
}

export default CommentEditScreen;
