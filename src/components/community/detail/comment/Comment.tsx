import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { COMMENT_DTO } from '@/types/api/types';
import { getDateLocaleFormat, getFormattedTime } from '@/utils';

interface CommentProps {
	comment?: COMMENT_DTO;
	show: () => void;
	setCommentId: (id: number | null) => void;
	selectedCommentId: number | null;
	setTargetComment: (comment: COMMENT_DTO) => void;
}

function Comment({
	comment,
	show,
	setCommentId,
	selectedCommentId,
	setTargetComment,
}: CommentProps) {
	const [date, setDate] = useState(getDateLocaleFormat(new Date()));
	const [time, setTime] = useState(getFormattedTime(new Date()));
	const { theme } = useThemeStore();
	const { t } = useTranslation();
	const styles = styling(theme, selectedCommentId, comment);

	useEffect(() => {
		if (comment?.updatedAt) {
			setDate(getDateLocaleFormat(comment?.updatedAt));
			setTime(getFormattedTime(comment?.updatedAt));
		}
	}, [comment?.updatedAt]);

	return (
		<View style={styles.container}>
			<View style={styles.commentTop}>
				{comment?.parentId ? (
					<Ionicons
						name="return-down-forward"
						color={colors[theme].GRAY_500}
						size={17}
					/>
				) : (
					<></>
				)}
				{comment?.imageUrl ? (
					<Image source={{ uri: comment?.imageUrl }} style={styles.user} />
				) : (
					<View style={styles.user}>
						<Ionicons
							name="person-sharp"
							color={colors[theme].GRAY_300}
							size={20}
						/>
					</View>
				)}
				<View style={styles.userInfo}>
					<Text style={styles.comment}>
						{comment?.isAnonymous ? t('익명') : comment?.name}
					</Text>
					<Text style={styles.infoText}>
						{date} {time}
					</Text>
				</View>
				<View style={styles.menuContainer}>
					{comment?.parentId ? (
						<></>
					) : (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								if (selectedCommentId === comment?.commentId) {
									setCommentId(null);
								} else if (comment?.commentId) {
									setCommentId(comment?.commentId);
								}
							}}
						>
							<Ionicons
								name="chatbubbles-outline"
								color={colors[theme].GRAY_700}
								size={18}
							/>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => {
							show();
							if (comment) {
								setTargetComment(comment);
							}
						}}
					>
						<Ionicons name="ellipsis-vertical" color="#000" size={18} />
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.commentLayout}>
				<Text style={styles.comment}>{comment?.content}</Text>
			</View>
			<View style={styles.verticalLine} />
		</View>
	);
}

const styling = (
	theme: ThemeMode,
	selectedCommentId: number | null,
	comment?: COMMENT_DTO,
) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			flex: 1,
			backgroundColor:
				selectedCommentId === comment?.commentId
					? colors[theme].PINK_200
					: 'transparent',
			padding: 5,
			borderRadius: 5,
			marginLeft: comment?.parentId ? 13 : 0,
		},
		commentTop: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		userInfo: {
			display: 'flex',
			flexDirection: 'column',
			gap: 5,
		},
		commentLayout: {
			marginLeft: 40,
		},
		user: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 30,
			height: 30,
			borderRadius: 500,
			backgroundColor: colors[theme].GRAY_100,
		},
		infoText: {
			color: colors[theme].GRAY_500,
			fontSize: 11,
		},
		comment: {
			color: colors[theme].BLACK,
			fontSize: 14,
		},
		verticalLine: {
			width: '95%',
			alignSelf: 'center',
		},
		menuContainer: {
			display: 'flex',
			flexDirection: 'row',
			marginLeft: 'auto',
			gap: 5,
		},
	});

export default Comment;
