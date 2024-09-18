import React from 'react';
import { View, Text } from 'react-native';
import useCommunity from '@/hooks/queries/useCommunity';

function TemporarySavedPostScreen() {
	const { useGetTempSavedPost } = useCommunity();

	return (
		<View>
			<Text>TemporarySavedPostScreen</Text>
		</View>
	);
}

export default TemporarySavedPostScreen;
