import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface MyHomeScreenProps {}

const MyHomeScreen = ({}: MyHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MyHomeScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyHomeScreen;
