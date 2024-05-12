import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface WishHomeScreenProps {}

const WishHomeScreen = ({}: WishHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>WishHomeScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WishHomeScreen;
