import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function CommunityCommentSkeletonScreen() {
	const styles = styling();

	return (
		<View style={styles.container}>
			<View style={styles.commentContainer}>
				<View style={styles.commentTop}>
					<SkeletonPlaceholder borderRadius={100}>
						<View style={styles.user} />
					</SkeletonPlaceholder>

					<View style={styles.userInfo}>
						<SkeletonPlaceholder borderRadius={5}>
							<View style={styles.username} />
						</SkeletonPlaceholder>

						<SkeletonPlaceholder borderRadius={5}>
							<View style={styles.infoText} />
						</SkeletonPlaceholder>
					</View>
				</View>
				<View style={styles.commentLayout}>
					<SkeletonPlaceholder borderRadius={10}>
						<View style={styles.comment} />
					</SkeletonPlaceholder>
				</View>
				<View style={styles.verticalLine} />
			</View>
		</View>
	);
}

const styling = () =>
	StyleSheet.create({
		container: {
			paddingHorizontal: 20,
		},
		recommntContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			paddingTop: 15,
			marginLeft: 10,
		},
		commentContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			flex: 1,
			padding: 5,
			borderRadius: 5,
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
		},
		infoText: {
			width: 70,
			height: 10,
		},
		username: {
			width: 50,
			height: 15,
		},
		comment: {
			width: '100%',
			height: 40,
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

export default CommunityCommentSkeletonScreen;
