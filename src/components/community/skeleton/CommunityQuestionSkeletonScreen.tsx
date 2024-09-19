import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function CommunityQuestionSkeletonScreen() {
	const styles = styling();

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<SkeletonPlaceholder>
					<View style={styles.profileImg} />
				</SkeletonPlaceholder>

				<View style={styles.userInfo}>
					<SkeletonPlaceholder borderRadius={10}>
						<View style={styles.name} />
					</SkeletonPlaceholder>
					<SkeletonPlaceholder borderRadius={10}>
						<View style={styles.date} />
					</SkeletonPlaceholder>
				</View>
			</View>
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
			<View style={styles.bottom}>
				<SkeletonPlaceholder borderRadius={5}>
					<View style={styles.commentCount} />
				</SkeletonPlaceholder>
			</View>
		</View>
	);
}

const styling = () =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		top: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
		},
		userInfo: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 5,
		},
		name: {
			width: 60,
			height: 10,
		},
		date: {
			width: 100,
			height: 10,
		},
		report: {
			width: 14,
			height: 11,
			alignSelf: 'center',
		},
		profileImg: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: 30,
			height: 30,
			borderRadius: 500,
		},
		title: {
			width: '100%',
			height: 30,
		},
		titleLayout: {
			padding: 10,
			borderRadius: 15,
		},
		content: {
			width: '100%',
			height: 100,
		},
		contents: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
		},
		bottom: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			padding: 5,
		},
		commentCount: {
			width: 40,
			height: 20,
		},
	});

export default CommunityQuestionSkeletonScreen;
