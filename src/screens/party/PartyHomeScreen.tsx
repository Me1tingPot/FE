import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface PartyHomeScreenProps {}

function PartyHomeScreen({}: PartyHomeScreenProps) {
	return (
		<SafeAreaView style={styles.container}>
			<Text>PartyHomeScreen</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default PartyHomeScreen;
