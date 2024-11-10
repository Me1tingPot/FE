import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function CommunityPostingSkeletonScreen() {
	const styles = styling();

	return (
		<SkeletonPlaceholder borderRadius={20}>
			<View style={styles.container} />
		</SkeletonPlaceholder>
	);
}

const styling = () =>
	StyleSheet.create({
		container: {
			width: '100%',
			height: 150,
		},
	});

export default CommunityPostingSkeletonScreen;
