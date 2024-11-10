import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function CommunityDetailSkeletonScreen() {
	const styles = styling();
	return (
		<>
			<View style={styles.rowGap10}>
				<SkeletonPlaceholder borderRadius={100}>
					<View style={styles.userImg} />
				</SkeletonPlaceholder>
				<View style={styles.questionInfoLayout}>
					<SkeletonPlaceholder borderRadius={5}>
						<View style={styles.username} />
					</SkeletonPlaceholder>
					<View style={styles.rowGap10}>
						<View style={styles.rowGap5}>
							<SkeletonPlaceholder borderRadius={5}>
								<View style={styles.questionInfo} />
							</SkeletonPlaceholder>
						</View>
						<View style={styles.rowGap5}>
							<SkeletonPlaceholder borderRadius={5}>
								<View style={styles.questionInfo} />
							</SkeletonPlaceholder>
						</View>
					</View>
				</View>
			</View>
			<>
				<View style={styles.contents}>
					<View style={styles.titleLayout}>
						<SkeletonPlaceholder borderRadius={10}>
							<View style={styles.title} />
						</SkeletonPlaceholder>
					</View>
					<SkeletonPlaceholder borderRadius={10}>
						<View style={styles.content} />
					</SkeletonPlaceholder>
				</View>

				<View style={[styles.bottom]}>
					<SkeletonPlaceholder borderRadius={5}>
						<View style={styles.translationText} />
					</SkeletonPlaceholder>
				</View>
				<View style={[styles.bottom]}>
					<SkeletonPlaceholder borderRadius={5}>
						<View style={styles.commentCount} />
					</SkeletonPlaceholder>
				</View>
			</>
		</>
	);
}

const styling = () =>
	StyleSheet.create({
		rowGap10: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		userImg: {
			width: 30,
			height: 30,
			borderRadius: 500,
		},
		questionInfoLayout: {
			flex: 1,
		},
		username: {
			width: 60,
			height: 15,
			marginBottom: 5,
		},
		rowGap5: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			alignItems: 'center',
		},
		questionInfo: {
			width: 50,
			height: 10,
		},
		contents: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		content: {
			paddingHorizontal: 10,
			marginBottom: 20,
			width: '100%',
			height: 200,
		},
		title: {
			width: '100%',
			height: 30,
		},
		titleLayout: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			borderRadius: 15,
		},
		bottom: {
			paddingHorizontal: 10,
		},
		translationLayout: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: 16,
			height: 16,
			borderRadius: 3,
		},
		translationText: {
			width: 70,
			height: 20,
		},
		commentCount: {
			width: 70,
			height: 20,
		},
	});

export default CommunityDetailSkeletonScreen;
